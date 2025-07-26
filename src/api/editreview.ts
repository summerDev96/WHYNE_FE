import apiClient from '@/api/apiClient';

interface UpdateReviewRequest {
  reviewId: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
}

export const updateReview = async ({ reviewId, ...body }: UpdateReviewRequest) => {
  return (apiClient.patch(`/${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}`), body);
};
