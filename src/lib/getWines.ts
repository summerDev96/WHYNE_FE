import useWineAddStore, { Wine } from '@/stores/wineAddStore';

interface GetWinesParams {
  cursor: number;
  limit: number;
  filters: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: string;
    searchTerm?: string;
  };
}

interface GetWinesResponse {
  list: Wine[];
  nextCursor: number | null;
  totalCount: number;
}

/* 평점 필터링 */
const ratingRangeMap: Record<string, [number, number]> = {
  all: [0, 5],
  '4.6': [4.5, 5],
  '4.1': [4.0, 4.5],
  '3.6': [3.5, 4.0],
  '3.1': [3.0, 3.5],
};

/* 필터링 + 페이징 */
export function getWines({ cursor, limit, filters }: GetWinesParams): GetWinesResponse {
  const allWines = useWineAddStore.getState().wines;

  const { type, minPrice = 0, maxPrice = Infinity, rating = 'all', searchTerm = '' } = filters;

  const [minRating, maxRating] = ratingRangeMap[rating] ?? [0, 5];
  const keyword = searchTerm.toLowerCase();

  const filtered = allWines.filter((wine) => {
    if (type && wine.type !== type) return false;
    if (wine.price < minPrice || wine.price > maxPrice) return false;
    if (wine.rating < minRating || wine.rating > maxRating) return false;
    if (
      keyword &&
      !wine.name.toLowerCase().includes(keyword) &&
      !wine.region.toLowerCase().includes(keyword)
    )
      return false;
    return true;
  });

  const totalCount = filtered.length;
  const paged = filtered.slice(cursor, cursor + limit);
  const nextCursor = cursor + limit < totalCount ? cursor + limit : null;

  return {
    list: paged,
    nextCursor,
    totalCount,
  };
}
