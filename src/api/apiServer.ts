import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';

export interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _refreshToken?: string;
  _context?: GetServerSidePropsContext;
}

export const createSeverApiInstance = (accessToken: string | undefined) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  instance.interceptors.request.use((config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => handleAxiosResponseError(error, instance),
  );

  return instance;
};

function handleAxiosResponseError(error: AxiosError, instance: AxiosInstance) {
  const status = error.response?.status;
  const originalRequest = error.config as RetryRequestConfig;

  /* _retry값 조회로 무한 요청x */
  if (originalRequest._retry) return handleCommonError(error);
  /* 없으면 재시도 플래그 설정 */
  originalRequest._retry = true;

  const refreshToken = originalRequest._refreshToken;
  const context = originalRequest._context;

  /* 401 에러가 아니거나 리프레시 토큰이 없거나 SSR 컨텍스트가 없으면 에러 */
  if (status !== 401 || !refreshToken || !context) return handleCommonError(error);

  try {
    /* 401 에러면 리프레시 토큰 갱신 */
    return handleRetryReuquest(originalRequest, refreshToken, context, instance);
  } catch (refreshTokenError) {
    console.error('리프레시 토큰 갱신 실패:', refreshTokenError);
    /*쿠키 삭제 */
    context.res.setHeader('Set-Cookie', [
      `accessToken=; Path=/; Max-Age=0;  SameSite=Lax`,
      `refreshToken=; Path=/; Max-Age=0; SameSite=Lax`,
    ]);

    return handleCommonError(refreshTokenError as AxiosError);
  }
}

function handleCommonError(error: AxiosError) {
  if (!error.response) {
    return Promise.reject(new Error('네트워크 오류가 발생. 인터넷 상태를 확인해주세요.'));
  }

  const { status, data } = error.response;
  let errorMessage = (data as { message?: string })?.message ?? '서버에서 오류가 발생했습니다.';

  console.error('API 에러 발생:', { status, errorMessage, data });
  return Promise.reject(error);
}

export async function fetchNewRefreshTokens(refreshToken: string) {
  if (!refreshToken) throw new Error('리프레쉬토큰이 없어요');
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM}/auth/refresh-token`,
    {
      refreshToken,
    },
  );

  return {
    newAccessToken: response.data.accessToken,
    newRefreshToken: response.data.refreshToken,
  };
}

async function handleRetryReuquest(
  originalRequest: RetryRequestConfig,
  refreshToken: string,
  context: GetServerSidePropsContext,
  instance: AxiosInstance,
): Promise<AxiosResponse> {
  const refreshResult = await fetchNewRefreshTokens(refreshToken);
  const { newAccessToken, newRefreshToken } = refreshResult;

  /* 클라이언트 쿠키에 반영되게 setCookie 옵션 넣어서 주기 */
  setAuthCookies(context.res, newAccessToken, newRefreshToken);

  /* 새 토큰으로 원래 요청의 헤더 수정 */
  if (originalRequest.headers) {
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  }

  /* 토큰 갱신 후 원래 요청을 재시도 */
  return instance(originalRequest);
}

function setAuthCookies(
  res: GetServerSidePropsContext['res'],
  accessToken: string,
  refreshToken: string,
) {
  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; Path=/; Max-Age=${60 * 5}; SameSite=Lax;`,
    `refreshToken=${refreshToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax;`,
  ]);
}
