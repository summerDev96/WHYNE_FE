import { NextApiRequest, NextApiResponse } from 'next';

import { clearAuthCookies } from '@/lib/cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  clearAuthCookies(res);

  res.status(200).json({
    message: '토큰 삭제 완료',
    success: true,
  });
}
