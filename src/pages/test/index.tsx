import { GetServerSidePropsContext } from 'next';

import { getUser } from '@/api/user';

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
  return <div>test</div>;
};

export default testPage;
