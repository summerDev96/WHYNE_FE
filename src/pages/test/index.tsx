import { GetServerSidePropsContext } from 'next';

import { getUser } from '@/api/user';
import { Button } from '@/components/ui/button';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const userData = await getUser(context);
    console.log('유저 데이터:');
    console.log(userData);
    return {
      props: {
        userData: userData ?? null,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};

const testPage = () => {
  const getMeData = async () => {
    try {
      const data = await getUser();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return <Button onClick={getMeData}>클라이언트 내정보 API 요청 테스트</Button>;
};

export default testPage;
