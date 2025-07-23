import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Router from 'next/router';

import { RetryRequestConfig } from '@/types/AuthTypes';

import { updateAccessToken } from './auth';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 토큰 추가 메소드
const addAccessToken = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

// 공통 에러 처리 메소드
const handleCommonError = (error: AxiosError) => {
  if (!error.response) {
    return Promise.reject(new Error('네트워크 오류가 발생했습니다. 인터넷 상태를 확인해주세요.'));
  }

  const { status, data } = error.response;
  // 에러 타입 정의하여 바꿔야 할듯
  let errorMessage = (data as { message?: string })?.message ?? '서버에서 오류가 발생했습니다.';

  // 에러!!
  console.error('API 에러 발생:', { status, errorMessage, data });
  return Promise.reject(error);
};

// 리프레쉬 토큰 및 에러 처리 메소드
const handleRefreshTokenError = async (error: AxiosError): Promise<AxiosResponse> => {
  const originalRequest = error.config as RetryRequestConfig;
  const refreshToken = localStorage.getItem('refreshToken');

  if (error.response?.status !== 401 || originalRequest._retry) return Promise.reject(error);

  originalRequest._retry = true;

  try {
    if (!refreshToken) {
      return Promise.reject(new Error('리프레쉬 토큰이 없습니다.'));
    }
    const data = await updateAccessToken({ refreshToken });

    // 갱신받은 access 토큰 저장
    localStorage.setItem('accessToken', data.accessToken);

    // 새 토큰으로 헤더 수정
    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
    }

    return apiClient(originalRequest); // 토큰 갱신 후 재요청
  } catch (requestError) {
    console.log(requestError, '인증이 만료되었습니다. 다시 로그인해주세요.');
    return Promise.reject(requestError);
  }
};

/* Axios 인터셉터 설정 */

// 토큰 추가 인터셉터
apiClient.interceptors.request.use(addAccessToken);

// 에러 처리 및 리프레쉬 토큰 추가 인터셉터
apiClient.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    try {
      const result = await handleRefreshTokenError(error);
      if (result) return result;
    } catch (refreshTokenError) {
      // 토큰 삭제 처리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      Router.replace('/');
      return handleCommonError(refreshTokenError as AxiosError);
    }

    return handleCommonError(error);
  },
);

export default apiClient;
