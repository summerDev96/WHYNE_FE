import apiClient from '@/api/apiClient';

export async function postLike(reviewId: number) {
  return apiClient.post(`${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}/like`);
}

export async function deleteLike(reviewId: number) {
  return apiClient.delete(`${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}/like`);
}
