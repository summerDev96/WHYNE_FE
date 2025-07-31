import apiClient from '@/api/apiClient';

interface UpdateReviewRequest {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
}

interface UpdateReviewResponse {
  success: boolean;
  message?: string;
}

export const updateReview = async ({
  id,
  ...body
}: UpdateReviewRequest): Promise<UpdateReviewResponse> => {
  const response = await apiClient.patch<UpdateReviewResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM}/reviews/${id}`,
    body,
  );
  return response.data;
};
