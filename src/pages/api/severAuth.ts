import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { clearAuthCookies, setAuthCookies } from '@/lib/cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = parseCookie(req.headers.cookie, 'accessToken');
  const refreshToken = parseCookie(req.headers.cookie, 'refreshToken');

  if (!accessToken) {
    return res.status(200).json({ user: null });
  }

  const fetchWineData = async (token: string) => {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };
  try {
    const backendResponse = await fetchWineData(accessToken as string);

    return res.status(backendResponse.status).json({ user: backendResponse.data });
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response?.status === 401 && accessToken) {
      //401오류면 ->
      //리프레쉬 토큰 추가해서 요청 보내기
      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM}/auth/refresh-token`,
          {
            refreshToken,
          },
        );
        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken;

        setAuthCookies(res, newAccessToken, newRefreshToken);
        const retryResponse = await fetchWineData(newAccessToken);
        return res.status(retryResponse.status).json(retryResponse.data);
      } catch (refreshErr) {
        clearAuthCookies(res);
        return res.status(401).json({ message: '인증에 실패했습니다. 다시 로그인해주세요.' });
      }
    }
    if (axiosError.response) {
      return res.status(axiosError.response.status).json(axiosError.response.data);
    }
  }
}

export function parseCookie(cookieHeader: string | undefined, name: string): string | undefined {
  if (!cookieHeader) {
    return undefined;
  }
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      // 쿠키 값은 URL 인코딩 되어 있을 수 있으므로 디코딩
      return decodeURIComponent(cookieValue);
    }
  }
  return undefined;
}
