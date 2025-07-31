import apiClient from '@/api/apiClient';

import type { MyWinesResponse } from '@/types/MyWinesTypes';
import type { Wine } from '@/types/WineTypes';

export const getRecommendedWines = async (): Promise<Wine[]> => {
  const teamId = process.env.NEXT_PUBLIC_TEAM;
  if (!teamId) throw new Error('NEXT_PUBLIC_TEAM 환경변수 없음');
  const url = `/${teamId}/wines/recommended`;
  const response = await apiClient.get<Wine[]>(url);
  return response;
};

interface GetWinesParams {
  cursor: number;
  limit: number;
  filters: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: string;
    searchTerm?: string;
  };
}

export const getWines = async ({
  cursor,
  limit,
  filters,
}: GetWinesParams): Promise<MyWinesResponse> => {
  const teamId = process.env.NEXT_PUBLIC_TEAM;
  if (!teamId) throw new Error('NEXT_PUBLIC_TEAM 환경변수 없음');
  const { type, minPrice, maxPrice, rating, searchTerm } = filters;
  const params: Record<string, string | number> = {
    cursor,
    limit,
  };
  if (type) params.type = type.toUpperCase();
  if (minPrice !== undefined) params.minPrice = minPrice;
  if (maxPrice !== undefined) params.maxPrice = maxPrice;
  if (rating && rating !== 'all') params.rating = rating;
  if (searchTerm) params.keyword = searchTerm;
  const url = `/${teamId}/wines`;
  const response = await apiClient.get<MyWinesResponse>(url, { params });
  return response;
};
