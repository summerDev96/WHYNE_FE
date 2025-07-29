import { GetServerSidePropsContext } from 'next';

export interface WineInfoServerOptions {
  accessToken?: string | undefined;
  refreshToken?: string;
  context?: GetServerSidePropsContext; // SSR에서만 사용
}

export interface GetWineInfoResponse {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: string[];
    rating: number;
    id: number;
  };
  userId: number;
  reviews: WineReview[];
  avgRatings: {
    additionalProp1: number;
    additionalProp2: number;
    additionalProp3: number;
  };
}

export interface WineReview {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  isLiked: boolean;
}
