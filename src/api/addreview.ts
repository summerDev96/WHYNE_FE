import apiClient from '@/api/apiClient';

interface PostReviewRequest {
  wineId: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
}

export const postReview = async (data: PostReviewRequest) => {
  return apiClient.post(`/${process.env.NEXT_PUBLIC_TEAM}/reviews`, data);
};
