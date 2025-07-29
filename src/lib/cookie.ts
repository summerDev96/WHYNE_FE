import { NextApiResponse } from 'next';

import {
  GetClientCookieParams,
  GetCookieParams,
  GetServerCookieParams,
  GetServerCookieReturn,
  SetCookieParams,
  SetCookieType,
  SetServerCookieParams,
} from '@/types/CookieTypes';

import { isClient } from './utils';

export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';

// 쿠키 설정
export function setAuthCookies(res: NextApiResponse, accessToken: string, refreshToken?: string) {
  const cookies = [
    `${COOKIE_NAMES.ACCESS_TOKEN}=${accessToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=strict; HttpOnly${secure}`,
  ];

  if (refreshToken) {
    cookies.push(
      `${COOKIE_NAMES.REFRESH_TOKEN}=${refreshToken}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=strict; HttpOnly${secure}`,
    );
  }

  res.setHeader('Set-Cookie', cookies);
}

// 쿠키 삭제
export function clearAuthCookies(res: NextApiResponse) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const cookies = [
    `${COOKIE_NAMES.ACCESS_TOKEN}=; Path=/; Max-Age=0; HttpOnly${secure}`,
    `${COOKIE_NAMES.REFRESH_TOKEN}=; Path=/; Max-Age=0; HttpOnly${secure}`,
  ];
  res.setHeader('Set-Cookie', cookies);
}

export function getCookie({ cookieHeader, name }: GetCookieParams) {
  return isClient() ? getClientCookie({ name }) : getServerCookie({ cookieHeader, name });
}

export function setCookie({ response, name, value, maxAge }: SetCookieParams) {
  if (isClient()) {
    return setClientCookie({ name, value, maxAge });
  }
  if (response) {
    return setServerCookie({ response, name, value, maxAge });
  }
  return undefined;
}

export function getClientCookie({ name }: GetClientCookieParams) {
  const cookieArr = document.cookie.split('; ');
  for (const cookie of cookieArr) {
    const [key, value] = cookie.split('=');
    if (key === name) return decodeURIComponent(value);
  }
}

export function getServerCookie({
  cookieHeader,
  name,
}: GetServerCookieParams): GetServerCookieReturn {
  if (!cookieHeader) return undefined;

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [key, ...val] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(val.join('='));
    }
  }
}

export function parseCookie(cookieHeader: string) {
  return Object.fromEntries(
    cookieHeader.split('; ').map((c) => {
      const [key, ...v] = c.split('=');
      return [key, decodeURIComponent(v.join('='))];
    }),
  );
}

export function setClientCookie({ name, value, maxAge }: SetCookieType) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=strict; HttpOnly${secure}`;
}

export function setServerCookie({ response, name, value, maxAge }: SetServerCookieParams) {
  const cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=strict; HttpOnly${secure}`;

  const prevCookies = response.getHeader('Set-Cookie');

  if (!prevCookies) {
    response.setHeader('Set-Cookie', cookie);
  } else if (Array.isArray(prevCookies)) {
    response.setHeader('Set-Cookie', [...prevCookies, cookie]);
  } else if (typeof prevCookies === 'string') {
    response.setHeader('Set-Cookie', [prevCookies, cookie]);
  }
}
