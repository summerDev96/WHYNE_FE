export interface MyReview {
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
  isLiked?: Record<string, boolean>;
  wine: {
    id: number;
    name: string;
    region: string;
    type: string;
    image: string;
    price: number;
    avgRating: number;
  };
}

export interface MyReviewsResponse {
  totalCount: number;
  nextCursor: number | null;
  list: MyReview[];
}
