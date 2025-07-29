import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import apiClient from '@/api/apiClient';
import { setAuthCookies } from '@/lib/cookie';
import { LoginResponse } from '@/types/AuthTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = `/${process.env.NEXT_PUBLIC_TEAM}/auth/signIn`;
    const data = (await apiClient.post(url, req.body)) as LoginResponse;
    const { accessToken, refreshToken } = data;

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      user: data.user,
      message: '로그인이 성공했습니다',
      success: true,
    });
    res.end();
  } catch (error) {
    const err = error as AxiosError;
    const message = error instanceof AxiosError ? error.message : '서버 오류가 발생했습니다.';
    const status = err.response?.status || 500;

    res.status(status).json({ message });
  }
}
