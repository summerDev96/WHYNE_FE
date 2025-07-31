import { GetWineInfoResponse } from '@/types/WineTypes';

import apiClient from './apiClient';

export const getWineInfoForClient = (wineid: number): Promise<GetWineInfoResponse> => {
  return apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/wines/${wineid}`);
};
