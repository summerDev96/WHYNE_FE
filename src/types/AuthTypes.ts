import { IncomingMessage, ServerResponse } from 'http';

import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';

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
  refreshToken: string;
}

export interface KakakoSignInRequest {
  state: string;
  redirectUri: string;
  token: string;
}

export interface KakakoSignInResponse {
  refreshToken: string;
  accessToken: string;
  user: User;
}

// 인터셉터 관련 타입
export interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface ApiClientContext {
  req: IncomingMessage;
  res: ServerResponse;
}

export interface RefreshTokenRequest {
  instance: AxiosInstance;
  error: AxiosError;
  refreshToken: string;
  response?: ServerResponse;
  context?: GetServerSidePropsContext;
}

export type RefreshTokenResponse = Promise<AxiosResponse | null>;
