import { GetWineInfoResponse, WineInfoServerOptions } from '@/types/WineTypes';

import apiClient from './apiClient';
import { createSeverApiInstance, RetryRequestConfig } from './apiServer';

export const getWineInfoForClient = (wineid: number): Promise<GetWineInfoResponse> => {
  return apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/wines/${wineid}`);
};

export async function getWineInfoForServer(
  wineid: number,
  options: WineInfoServerOptions,
): Promise<GetWineInfoResponse> {
  const instance = createSeverApiInstance(options.accessToken);
  const response = await instance.get(`/${process.env.NEXT_PUBLIC_TEAM}/wines/${wineid}`, {
    _refreshToken: options.refreshToken,
    _context: options.context,
  } as RetryRequestConfig);

  return response.data;
}
