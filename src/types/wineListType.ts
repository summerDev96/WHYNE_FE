export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: 'RED' | 'WHITE' | 'SPARKLING';
  avgRating: number;
  reviewCount: number;
  recentReview: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  userId: number;
}

export interface RecommendedWine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: 'RED' | 'WHITE' | 'SPARKLING';
  avgRating: number;
}

export interface GetWinesParams {
  teamId: string;
  cursor?: number | null;
  limit?: number;
  filters: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    searchTerm?: string;
  };
}

export interface GetWinesResponse {
  list: Wine[];
  totalCount: number;
  nextCursor: number | null;
}

export type RecommendedWineResponse = RecommendedWine[];
