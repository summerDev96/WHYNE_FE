import { NextApiRequest, NextApiResponse } from 'next';

import { parseCookie } from '@/lib/cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieHeader = req.headers.cookie;
  console.log('test');
  if (cookieHeader) {
    const cookies = parseCookie(cookieHeader);

    return res.status(200).json({
      accessToken: cookies.accessToken ?? null,
      refreshToken: cookies.refreshToken ?? null,
    });
  }

  return res.status(200).json({
    accessToken: null,
    refreshToken: null,
  });
}
