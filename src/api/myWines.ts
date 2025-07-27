import apiClient from '@/api/apiClient';

import type { MyWinesResponse } from '@/types/MyWinesTypes';

const PAGE_LIMIT = 10;

export const getMyWines = async (
  cursor: number = 0,
  limit: number = PAGE_LIMIT,
): Promise<MyWinesResponse> => {
  const response = await apiClient.get<MyWinesResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM}/users/me/wines`,
    { params: { cursor, limit } },
  );
  return response.data;
};
