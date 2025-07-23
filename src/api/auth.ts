import axios from '@/api/apiClient';
import {
  AccessTokenRequest,
  AccessTokenResponse,
  KakakoSignInRequest,
  KakakoSignInResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/AuthTypes';

export const createUser = (data: SignupRequest): Promise<SignupResponse> => {
  return axios.post(`/${process.env.NEXT_PUBLIC_TEAM}/auth/signUp`, data);
};

export const loginUser = (data: LoginRequest): Promise<LoginResponse> => {
  return axios.post(`/${process.env.NEXT_PUBLIC_TEAM}/auth/signIn`, data);
};

export const updateAccessToken = (data: AccessTokenRequest): Promise<AccessTokenResponse> => {
  return axios.post(`/${process.env.NEXT_PUBLIC_TEAM}/auth/refresh-token`, data);
};

export const signInKakao = (data: KakakoSignInRequest): Promise<KakakoSignInResponse> => {
  return axios.post(`/${process.env.NEXT_PUBLIC_TEAM}/auth/signIn/KAKAO`, data);
};
