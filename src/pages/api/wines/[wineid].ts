import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wineid } = req.query as { wineid: string };
  try {
    const accessToken = parseCookie(req.headers.cookie, 'accessToken');

    const backendResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM}/wines/${wineid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.status(backendResponse.status).json(backendResponse.data);
  } catch (err) {
    console.log(err);
  }
}

function parseCookie(cookieHeader: string | undefined, name: string): string | undefined {
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
