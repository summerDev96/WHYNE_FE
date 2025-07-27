export type MyWine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    id: number;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    aroma: string[];
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    isLiked: Record<string, any>;
  };
};

export type MyWinesResponse = {
  totalCount: number;
  nextCursor: number | null;
  list: MyWine[];
};
