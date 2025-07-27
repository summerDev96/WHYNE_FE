import apiClient from '@/api/apiClient';

import type { MyReviewsResponse } from '@/types/MyReviewsTypes';

const PAGE_LIMIT = 10;

export const getMyReviews = async (
  cursor: number = 0,
  limit: number = PAGE_LIMIT,
): Promise<MyReviewsResponse> => {
  const response = await apiClient.get<MyReviewsResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM}/users/me/reviews`,
    { params: { cursor, limit } },
  );
  return response.data;
};
