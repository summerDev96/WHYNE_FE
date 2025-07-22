import axios from '@/lib/api';
import {
  AccessTokenRequest,
  AccessTokenResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/AuthTypes';

export const userRegister = (data: SignupRequest): Promise<SignupResponse> => {
  return axios.post(`/${process.env.NEXT_PUBLIC_TEAM}/auth/signUp`, data);
};

export const userLogin = (data: LoginRequest): Promise<LoginResponse> => {
  return axios.post(`/${process.env.NEXT_PUBLIC_TEAM}/auth/signIn`, data);
};

export const updateAccessToken = (data: AccessTokenRequest): Promise<AccessTokenResponse> => {
  return axios.post(`/${process.env.NEXT_PUBLIC_TEAM}/auth/refresh-token`, data);
};
