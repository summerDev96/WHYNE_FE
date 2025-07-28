export interface getCookieType {
  name: string;
}

export interface setCookieType {
  name: string;
  value: string;
  maxAge: number;
}

export interface setCookieCallbackType {
  accessToken: string;
  refreshToken: string;
  callback: () => void;
}

export interface ServerCookieParams {
  cookieHeader: string | undefined;
  name: string;
}

export type ServerCookieReturn = string | undefined;
