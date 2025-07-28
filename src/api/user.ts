import { GetServerSidePropsContext } from 'next';

import { GetUserResponse } from '@/types/UserTypes';

import { createApiClient } from './apiClient';

// getServerSideProps 확인을 위해 cookieHeader 부분 임시 추가
export const getUser = (context?: GetServerSidePropsContext): Promise<GetUserResponse> => {
  return createApiClient(context).get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
};
