import axios from '@/api/apiClient';
import { GetUserResponse } from '@/types/UserTypes';

export const getUser = (): Promise<GetUserResponse> => {
  return axios.get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
};
