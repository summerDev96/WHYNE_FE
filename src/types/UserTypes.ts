export interface GetUserRequest {
  cookieHeader?: string;
}

export interface GetUserResponse {
  image: string;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  nickname: string;
  id: number;
}
