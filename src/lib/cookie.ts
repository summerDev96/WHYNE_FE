import {
  ClearAuthCookiesParams,
  GetClientCookieParams,
  GetCookieParams,
  GetServerCookieParams,
  GetServerCookieReturn,
  SetCookieCallbackParams,
  SetCookieParams,
  SetCookieType,
  SetServerCookieParams,
} from '@/types/CookieTypes';

import { isClient } from './utils';

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

export function setClientCookie({ name, value, maxAge }: SetCookieType) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
}

export function setServerCookie({ response, name, value, maxAge }: SetServerCookieParams) {
  const cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure; HttpOnly`;

  const prevCookies = response.getHeader('Set-Cookie');

  if (!prevCookies) {
    response.setHeader('Set-Cookie', cookie);
  } else if (Array.isArray(prevCookies)) {
    response.setHeader('Set-Cookie', [...prevCookies, cookie]);
  } else if (typeof prevCookies === 'string') {
    response.setHeader('Set-Cookie', [prevCookies, cookie]);
  }
}

export function setAuthCookiesWithCallback({
  accessToken,
  refreshToken,
  callback,
}: SetCookieCallbackParams) {
  setCookie({ name: 'accessToken', value: accessToken, maxAge: 1800 }); // 만료 30분
  setCookie({ name: 'refreshToken', value: refreshToken, maxAge: 604800 }); // 만료 7일
  if (isClient()) {
    callback();
  }
}

export function clearAuthCookiesWithCallback(callback: ClearAuthCookiesParams) {
  setCookie({ name: 'accessToken', value: '', maxAge: 0 });
  setCookie({ name: 'refreshToken', value: '', maxAge: 0 });
  if (isClient()) {
    callback();
  }
}
