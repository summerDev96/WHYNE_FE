import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { getWines } from '@/lib/wineApi';
import useFilterStore from '@/stores/filterStore';
import useWineSearchKeywordStore from '@/stores/searchStore';
import { GetWinesResponse } from '@/types/wineListType';

const PAGE_LIMIT = 8;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM;

export function useWineListQuery() {
  const type = useFilterStore((state) => state.type);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const rating = useFilterStore((state) => state.rating);
  const searchTerm = useWineSearchKeywordStore((state) => state.searchTerm);

  const apiRating = rating === 'all' ? undefined : Number(rating);

  return useInfiniteQuery<GetWinesResponse, unknown, InfiniteData<GetWinesResponse>>({
    queryKey: ['wines', { type, minPrice, maxPrice, rating: apiRating, name: searchTerm }],
    queryFn: ({ pageParam = 0 }) => {
      const filters = {
        type: type.toUpperCase(),
        minPrice,
        maxPrice,
        rating: apiRating,
        name: searchTerm,
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
