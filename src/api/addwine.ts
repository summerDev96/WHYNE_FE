import apiClient from '@/api/apiClient';

export interface PostWineRequest {
  name: string;
  region: string;
  image: string;
  price: number;
  type: 'RED' | 'WHITE' | 'SPARKLING';
}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = (await apiClient.post<{ url: string }>(
    `/${process.env.NEXT_PUBLIC_TEAM}/images/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )) as unknown as { url: string }; //타입스크립트가 제안하는 대로 중간에 unknown 타입으로 한 번 변환한 후, 원하는 최종 타입으로 다시 변환하는 "이중 캐스팅
  console.log(response);
  //apiClient가 res.data만 반환함
  return response.url;
};

export const postWine = async (data: PostWineRequest) => {
  const response = await apiClient.post(`/${process.env.NEXT_PUBLIC_TEAM}/wines`, data);
  return response.data;
};
