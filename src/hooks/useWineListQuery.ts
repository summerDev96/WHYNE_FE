import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { getWines } from '@/lib/wineApi';
import useFilterStore from '@/stores/filterStore';
import useWineSearchKeywordStore from '@/stores/searchStore';
import { GetWinesResponse } from '@/types/wineListType';

const PAGE_LIMIT = 8;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM;

const getMinRatingFromFilter = (rating: string): number | undefined => {
  const ratingMap: Record<string, number> = {
    '4.5 - 5.0': 4.5,
    '4.0 - 4.5': 4.0,
    '3.5 - 4.0': 3.5,
    '3.0 - 3.5': 3.0,
  };
  return ratingMap[rating];
};

export function useWineListQuery() {
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const rating = useFilterStore((state) => state.rating);
  const searchTerm = useWineSearchKeywordStore((state) => state.searchTerm);

  const minRating = getMinRatingFromFilter(rating);

  return useInfiniteQuery<GetWinesResponse, unknown, InfiniteData<GetWinesResponse>>({
    queryKey: ['wines', { minPrice, maxPrice, rating: minRating, searchTerm }],
    queryFn: ({ pageParam = 0 }) => {
      const filters = {
        minPrice,
        maxPrice,
        rating: minRating,
        searchTerm,
      };

      const filteredParams = Object.fromEntries(
        Object.entries(filters).filter(
          ([, value]) => value !== null && value !== undefined && value !== '',
        ),
      );

      return getWines({
        teamId: TEAM_ID!,
        cursor: pageParam as number,
        limit: PAGE_LIMIT,
        filters: filteredParams,
      });
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });
}
