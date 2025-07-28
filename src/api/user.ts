import apiClient from '@/api/apiClient';
import { GetUserResponse } from '@/types/UserTypes';

export const getUser = (): Promise<GetUserResponse> => {
  return apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
};
