import { useInfiniteQuery } from '@tanstack/react-query';

import { getWines } from '@/lib/getWines';
import useFilterStore from '@/stores/filterStore';
import useWineSearchKeywordStore from '@/stores/searchStore';

const PAGE_LIMIT = 8;

export function useWineListQuery() {
  const type = useFilterStore((state) => state.type);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const rating = useFilterStore((state) => state.rating);
  const searchTerm = useWineSearchKeywordStore((state) => state.searchTerm);

  return useInfiniteQuery({
    queryKey: ['wines', { type, minPrice, maxPrice, rating, searchTerm }],
    queryFn: ({ pageParam = 0 }) =>
      getWines({
        cursor: pageParam,
        limit: PAGE_LIMIT,
        filters: { type, minPrice, maxPrice, rating, searchTerm },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
