import { NextApiResponse } from 'next';

export interface GetClientCookieParams {
  name: string;
}

export interface SetCookieType {
  name: string;
  value: string;
  maxAge: number;
}

export interface SetCookieCallbackParams {
  accessToken: string;
  refreshToken: string;
  callback: () => void;
}

export type ClearAuthCookiesParams = () => void;

export interface GetServerCookieParams {
  cookieHeader: string | undefined;
  name: string;
}

export type GetServerCookieReturn = string | undefined;

export interface SetServerCookieParams {
  response: NextApiResponse;
  name: string;
  value: string;
  maxAge: number;
}

export interface CookieHeaderParams {
  cookieHeader?: string | undefined;
}

export interface GetCookieParams {
  name: string;
  cookieHeader?: string | undefined;
}

export interface SetCookieParams {
  name: string;
  value: string;
  maxAge: number;
  response?: NextApiResponse;
}
