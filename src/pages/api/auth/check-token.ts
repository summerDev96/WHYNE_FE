import { NextApiRequest, NextApiResponse } from 'next';

import { parseCookie } from '@/lib/cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = parseCookie(cookieHeader);

    if (!cookies.accessToken && !cookies.refreshToken) {
      return res.status(401).json({ message: '토큰이 없습니다.' });
    }

    return res.status(200).json({
      accessToken: cookies.accessToken ?? null,
      refreshToken: cookies.refreshToken ?? null,
    });
  }

  res.status(500).json({ message: '에러 발생' });
}
