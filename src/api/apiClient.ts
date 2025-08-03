import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { updateAccessToken } from '@/api/auth';
import { getCookie, setAuthCookies } from '@/lib/cookie';
import { isClient } from '@/lib/utils';
import {
  ApiClientContext,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RetryRequestConfig,
} from '@/types/AuthTypes';
import { CookieHeaderParams } from '@/types/CookieTypes';

// 서버사이드 렌더링의 경우 context를 전달받음
export const createApiClient = (context?: ApiClientContext) => {
  const cookieHeader = context?.req?.headers.cookie || '';

  // axios 인스턴스 생성
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10_000,
    headers: { 'Content-Type': 'application/json' },
  });

  /* Axios 인터셉터 설정 */
  // 토큰 추가 인터셉터
  instance.interceptors.request.use(createAddAccessToken({ cookieHeader }));

  // 에러 처리 및 리프레쉬 토큰 추가 인터셉터
  instance.interceptors.response.use(
    (res) => res.data,
    async (error) => {
      const status = error.response?.status;

      const refreshToken = await getCookie({ name: 'refreshToken', cookieHeader });

      if (status !== 401 || !refreshToken) return handleCommonError(error);

      try {
        const result = await handleRequestRefreshToken({
          instance,
          error,
          refreshToken,
          res: context?.res,
        });
        if (result) return result;
      } catch (refreshTokenError) {
        if (isClient()) {
          window.location.href = '/login';
        }
        return handleCommonError(refreshTokenError as AxiosError);
      }
    },
  );

  return instance;
};

const apiClient = createApiClient();
export default apiClient;

// 토큰 추가 메소드
function createAddAccessToken({ cookieHeader }: CookieHeaderParams) {
  return async function addAccessToken(config: InternalAxiosRequestConfig) {
    if ((config as RetryRequestConfig)._retry) return config;

    const accessToken = await getCookie({ name: 'accessToken', cookieHeader });
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  };
}

// 공통 에러 처리 메소드
function handleCommonError(error: AxiosError) {
  if (!error.response) {
    return Promise.reject(new Error('네트워크 오류가 발생했습니다. 인터넷 상태를 확인해주세요.'));
  }

  const { status, data } = error.response;
  // todo: 에러 타입 정의하여 바꾸기
  let errorMessage = (data as { message?: string })?.message ?? '서버에서 오류가 발생했습니다.';

  // 에러 디버깅
  console.error('API 에러 발생:', { status, errorMessage, data });
  return Promise.reject(error);
}

// 리프레쉬 토큰 및 에러 처리 메소드
async function handleRequestRefreshToken({
  instance,
  error,
  res,
  refreshToken,
}: RefreshTokenRequest): RefreshTokenResponse {
  const originalRequest = error.config as RetryRequestConfig;

  if (originalRequest._retry) return null;
  originalRequest._retry = true;

  const data = await updateAccessToken({ refreshToken });
  const accessToken = data.accessToken;

  if (!isClient() && res) {
    setAuthCookies(res, accessToken);
  }

  originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

  const retryRequestConfig = {
    ...originalRequest,
    baseURL: instance.defaults.baseURL,
    headers: originalRequest.headers,
  };

  return await instance.request(retryRequestConfig); // 토큰 갱신 후 재요청
}
