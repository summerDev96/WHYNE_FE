import { GetServerSidePropsContext } from 'next';

import { GetUserResponse } from '@/types/UserTypes';

import { createApiClient } from './apiClient';

// getServerSideProps 확인을 위해 임시 수정되어있음
export const getUser = (context?: GetServerSidePropsContext): Promise<GetUserResponse> => {
  return createApiClient(context).get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
};
