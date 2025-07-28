import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Router from 'next/router';

import { getCookie, getServerCookie, setCookie } from '@/lib/cookie';
import { RetryRequestConfig } from '@/types/AuthTypes';

import { updateAccessToken } from './auth';

const isClient = typeof window !== 'undefined';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

/* Axios 인터셉터 설정 */
// 토큰 추가 인터셉터
apiClient.interceptors.request.use(addAccessToken);

// 에러 처리 및 리프레쉬 토큰 추가 인터셉터
apiClient.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const status = error.response?.status;
    // 클라이언트: 토큰 삭제 처리 후 리디렉트
    // 서버사이드: getServerSideProps에서 처리 필요
    if (!isClient) return Promise.reject(error);
    const refreshToken = getCookie({ name: 'refreshToken' });

    if (status !== 401 || !refreshToken) return handleCommonError(error);
    try {
      const result = await handleRequestRefreshToken(error, refreshToken);
      if (result) return result;
    } catch (refreshTokenError) {
      setCookie({ name: 'accessToken', value: '', maxAge: 0 });
      setCookie({ name: 'refreshToken', value: '', maxAge: 0 });
      Router.replace('/signin');
      return handleCommonError(refreshTokenError as AxiosError);
    }
  },
);

export default apiClient;

// 토큰 추가 메소드
function addAccessToken(config: InternalAxiosRequestConfig) {
  let accessToken;

  if (isClient) {
    accessToken = getCookie({ name: 'accessToken' });
  } else {
    const cookieHeader = config.headers?.cookie;
    accessToken = getServerCookie({ cookieHeader, name: 'accessToken' });
  }
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
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

// 클라이언트: 리프레쉬 토큰 및 에러 처리 메소드
// 서버사이드: getServerSideProps에서 처리 필요
async function handleRequestRefreshToken(
  error: AxiosError,
  refreshToken: string,
): Promise<AxiosResponse | null> {
  const originalRequest = error.config as RetryRequestConfig;

  if (originalRequest._retry) return null;
  originalRequest._retry = true;

  const data = await updateAccessToken({ refreshToken });

  // 갱신받은 access 토큰 저장
  setCookie({ name: 'accessToken', value: data.accessToken, maxAge: 1800 });

  // 새 토큰으로 헤더 수정
  if (originalRequest.headers) {
    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
  }

  return apiClient(originalRequest); // 토큰 갱신 후 재요청
}
