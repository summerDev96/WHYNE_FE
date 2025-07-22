import { InternalAxiosRequestConfig } from 'axios';

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface User {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  email: string;
}

export interface SignupResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AccessTokenRequest {
  refreshToken: string;
}

export interface AccessTokenResponse {
  accessToken: string;
}

// 인터셉터 관련 타입
export interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
