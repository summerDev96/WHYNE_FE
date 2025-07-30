import apiClient from '@/api/apiClient';
import { GetUserResponse } from '@/types/UserTypes';

/**
 * 사용자 프로필 업데이트 요청 타입
 */
export interface ProfileUpdate {
  image?: string;
  nickname?: string;
}

/**
 * 현재 로그인된 사용자 정보 조회
 *
 * @returns 사용자 정보 객체
 */
export const getUser = (): Promise<GetUserResponse> => {
  return apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
};

/**
 * 프로필 이미지 업로드 요청
 *
 * @param file 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL 문자열
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const { url } = await apiClient.post<{ url: string }, { url: string }>(
    `/${process.env.NEXT_PUBLIC_TEAM}/images/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return url;
};

/**
 * 사용자 프로필 정보 수정
 *
 * @param profileUpdate 수정할 프로필 필드 (image 또는 nickname 중 일부 혹은 전체)
 * @returns 갱신된 사용자 정보 객체
 */
export const updateProfile = (profileUpdate: ProfileUpdate): Promise<GetUserResponse> => {
  return apiClient.patch<GetUserResponse, GetUserResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM}/users/me`,
    profileUpdate,
  );
};
