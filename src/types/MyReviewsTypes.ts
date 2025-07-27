export type MyReview = {
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
  isLiked: Record<string, any>;
};

export type MyReviewsResponse = {
  totalCount: number;
  nextCursor: number | null;
  list: MyReview[];
};
