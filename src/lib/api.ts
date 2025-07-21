import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: "https://winereview-api.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(
        new Error("네트워크 오류가 발생했습니다. 인터넷 상태를 확인해주세요.")
      );
    }

    const status = error.response.status;
    let errorMessage = "";

    switch (status) {
      case 400:
        errorMessage = "잘못된 요청입니다.";
        break;
      case 401:
        errorMessage = "로그인이 필요합니다.";
        break;
      case 403:
        errorMessage = "접근 권한이 없습니다.";
        break;
      case 404:
        errorMessage = "요청한 리소스를 찾을 수 없습니다.";
        break;
      case 500:
        errorMessage = "서버에서 문제가 발생했습니다.";
        break;
      default:
        errorMessage = "오류가 발생했습니다.";
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
