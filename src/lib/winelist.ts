const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM;

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
  cursor: number;
  limit: number;
  filters?: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    searchTerm?: string;
  };
}

export interface WinesResponse {
  list: Wine[];
  totalCount: number;
  nextCursor: number | null;
}
/* 추천 와인 API */
export async function getRecommendedWines(): Promise<RecommendedWine[]> {
  const res = await fetch(`${BASE_URL}/${TEAM_ID}/wines/recommended`);
  if (!res.ok) throw new Error('추천 와인 불러오기 실패');
  return res.json();
}

/* 전체 와인 목록 API (필터 + 페이징) */
export async function getWines({
  cursor,
  limit,
  filters = {},
}: GetWinesParams): Promise<WinesResponse> {
  const query = new URLSearchParams({
    cursor: String(cursor),
    limit: String(limit),
    ...(filters.type && { type: filters.type }),
    ...(filters.minPrice && { minPrice: String(filters.minPrice) }),
    ...(filters.maxPrice && { maxPrice: String(filters.maxPrice) }),
    ...(filters.rating && { rating: String(filters.rating) }),
    ...(filters.searchTerm && { searchTerm: filters.searchTerm }),
  });

  const res = await fetch(`${BASE_URL}/${TEAM_ID}/wines?${query.toString()}`);
  if (!res.ok) throw new Error('와인 목록 불러오기 실패');
  return res.json();
}
