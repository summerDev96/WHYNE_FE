import { useInfiniteQuery } from '@tanstack/react-query';

import { getWines } from '@/lib/winelist';
import useFilterStore from '@/stores/filterStore';
import useWineSearchKeywordStore from '@/stores/searchStore';

const PAGE_LIMIT = 8;

const getMinRatingFromFilter = (rating: string): number | undefined => {
  const ratingMap: Record<string, number> = {
    '4.6': 4.5,
    '4.1': 4.0,
    '3.6': 3.5,
    '3.1': 3.0,
  };
  return ratingMap[rating];
};

export function useWineListQuery() {
  const type = useFilterStore((state) => state.type);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const rating = useFilterStore((state) => state.rating);
  const searchTerm = useWineSearchKeywordStore((state) => state.searchTerm);

  const minRating = getMinRatingFromFilter(rating);

  return useInfiniteQuery({
    queryKey: ['wines', { type, minPrice, maxPrice, rating, searchTerm }],
    queryFn: ({ pageParam = 0 }) =>
      getWines({
        cursor: pageParam,
        limit: PAGE_LIMIT,
        filters: {
          type,
          minPrice,
          maxPrice,
          rating: minRating,
          searchTerm,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
