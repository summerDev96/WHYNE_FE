import axios from 'axios';

import { GetWinesParams, GetWinesResponse, RecommendedWineResponse } from '@/types/wineListType';

const API_BASE_URL = 'https://winereview-api.vercel.app';

interface GetRecommendedWinesParams {
  teamId: string;
  limit: number;
}

export const getWines = async ({
  teamId,
  cursor,
  limit,
  filters,
}: GetWinesParams): Promise<GetWinesResponse> => {
  try {
    const params = new URLSearchParams();
    if (cursor !== undefined && cursor !== null) {
      params.append('cursor', String(cursor));
    }
    if (limit !== undefined) {
      params.append('limit', String(limit));
    }

    // 필터 객체를 순회하며 유효한 필터만 파라미터에 추가
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    const response = await axios.get(`${API_BASE_URL}/${teamId}/wines?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch wines:', error);
    throw error;
  }
};

export const getRecommendedWines = async ({
  teamId,
  limit,
}: GetRecommendedWinesParams): Promise<RecommendedWineResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${teamId}/wines/recommended?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recommended wines:', error);
    throw error;
  }
};
