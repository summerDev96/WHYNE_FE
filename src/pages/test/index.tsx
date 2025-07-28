import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

import { updateAccessToken } from '@/api/auth';
import { getUser } from '@/api/user';
import { getServerCookie } from '@/lib/cookie';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookieHeader = context.req.headers.cookie || '';

  try {
    const userData = await getUser({ cookieHeader });
    console.log('유저 데이터:');
    console.log(userData);
    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    console.error('에러 발생함:');
    console.error(error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const refreshToken = getServerCookie({ cookieHeader, name: 'refreshToken' });
      if (status === 401 && refreshToken) {
        // 401 오류인 경우 + 리프레쉬 토큰 있음 => 액세스 토큰으로 리프레쉬 토큰 요청
        try {
          const { accessToken } = await updateAccessToken({ refreshToken });
          context.res.setHeader('Set-Cookie', [
            `accessToken=${accessToken}; Path=/; Max-Age=1800; HttpOnly; SameSite=Lax`,
          ]);

          const updatedCookieHeader = `accessToken=${accessToken}; refreshToken=${refreshToken}`;
          const userData = await getUser({ cookieHeader: updatedCookieHeader });
          console.log('재요청 유저 데이터:');
          console.log(userData);

          return {
            props: { userData },
          };
        } catch (refreshError) {
          // 리프레쉬 토큰 갱신 실패 시 쿠키 지움
          console.log('리프레쉬 토큰 갱신이 실패되어 쿠키가 지워집니다.');
          context.res.setHeader('Set-Cookie', [
            'accessToken=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax',
            'refreshToken=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax',
          ]);
          return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          };
        }
      }

      // 리프레쉬 토큰이 없는 경우
      console.log('리프레쉬 토큰이 존재하지 않습니다. 로그인 화면으로 이동합니다.');
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }
  }
};

const testPage = () => {
  return <div>test</div>;
};

export default testPage;
