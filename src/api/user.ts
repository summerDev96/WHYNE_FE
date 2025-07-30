import apiClient from '@/api/apiClient';
import { GetUserResponse } from '@/types/UserTypes';

export const getUser = (): Promise<GetUserResponse> => {
  return apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
};

type UploadImageResponse = { url: string };

/**
 * 프로필 이미지 업로드 요청
 * @param teamId 현재 팀 ID
 * @param imageFile 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const rawResponse = await apiClient.post(
    `/${process.env.NEXT_PUBLIC_TEAM}/images/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  // unknown으로 한 번 감싸준 후 원하는 타입으로 변환
  const { url } = rawResponse as unknown as UploadImageResponse;

  return url;
};
