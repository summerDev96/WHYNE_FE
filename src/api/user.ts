import { GetServerSidePropsContext } from 'next';

import { createApiClient } from '@/api/apiClient';
import { GetUserResponse } from '@/types/UserTypes';

// getServerSideProps 확인을 위해 임시 수정되어있음
export const getUser = (context?: GetServerSidePropsContext): Promise<GetUserResponse> => {
  return createApiClient(context).get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
};
