import axios, { AxiosError } from 'axios';

export const tokenClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

tokenClient.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    return handleCommonError(error as AxiosError);
  },
);

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
