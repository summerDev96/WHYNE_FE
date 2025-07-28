import apiClient from '@/api/apiClient';

export const deleteWine = async (wineId: number) => {
  return apiClient.delete(`/${process.env.NEXT_PUBLIC_TEAM}/wines/${wineId}`);
};

export const deleteReview = async (reviewId: number) => {
  return apiClient.delete(`/${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}`);
};
