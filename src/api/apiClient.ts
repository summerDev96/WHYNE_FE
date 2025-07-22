import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://winereview-api.vercel.app',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('네트워크 오류가 발생했습니다. 인터넷 상태를 확인해주세요.'));
    }

    const { status, data } = error.response;
    let errorMessage = data?.message ?? '서버에서 오류가 발생했습니다.';

    // 에러 디버깅 콘솔
    console.error('API 에러 발생:', { status, errorMessage, data });
    return Promise.reject(new Error(errorMessage));
  },
);

export default apiClient;
