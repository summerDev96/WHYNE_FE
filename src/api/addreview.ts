import apiClient from './apiClient';

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

interface PostReviewResponse {
  success: boolean;
  message?: string;
}

export const postReview = async (data: PostReviewRequest) => {
  const response = await apiClient.post<PostReviewResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM}/reviews`,
    data,
  );
  return response.data;
};
