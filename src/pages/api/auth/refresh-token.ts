import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import apiClient from '@/api/apiClient';
import { setAuthCookies } from '@/lib/cookie';
import { AccessTokenResponse } from '@/types/AuthTypes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = `/${process.env.NEXT_PUBLIC_TEAM}/auth/refresh-token`;
    const data = (await apiClient.post(url, req.body)) as AccessTokenResponse;
    const { accessToken } = data;
    setAuthCookies(res, accessToken);

    res.status(200).json({
      accessToken,
      message: '리프레쉬 토큰 갱신이 완료되었습니다.',
      success: true,
    });
    res.end();
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    const message = error instanceof AxiosError ? error.message : '서버 오류가 발생했습니다.';
    const status = err.response?.status || 500;

    res.status(status).json({ message });
  }
}
