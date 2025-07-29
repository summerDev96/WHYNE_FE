import apiClient from '@/api/apiClient';

export interface DeleteResponse {
  success: boolean;
  message?: string;
}

export const deleteWine: (wineId: number) => Promise<DeleteResponse> = async (wineId) => {
  const response = await apiClient.delete<DeleteResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM}/wines/${wineId}`,
  );
  return response.data;
};

export const deleteReview = async (reviewId: number): Promise<DeleteResponse> => {
  const response = await apiClient.delete<DeleteResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}`,
  );
  return response.data;
};
