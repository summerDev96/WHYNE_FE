import { useEffect, useRef, useState } from 'react';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { getWines } from '@/lib/wineApi';
import useFilterStore from '@/stores/filterStore';
import useWineSearchKeywordStore from '@/stores/searchStore';
import { GetWinesResponse } from '@/types/wineListType';

const PAGE_LIMIT = 8;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM;

function useDebounce<T>(value: T) {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<T>(() => value);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [value]);
  return debouncedValue;
}

export function useWineListQuery() {
  const type = useFilterStore((state) => state.type);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const rating = useFilterStore((state) => state.rating);
  const searchTerm = useWineSearchKeywordStore((state) => state.searchTerm);

  const debouncedType = useDebounce(type);
  const debouncedMinPrice = useDebounce(minPrice);
  const debouncedMaxPrice = useDebounce(maxPrice);
  const debouncedSearchTerm = useDebounce(searchTerm);

  const apiRating = rating === 'all' ? undefined : Number(rating);
  const debouncedRating = useDebounce(apiRating);

  return useInfiniteQuery<GetWinesResponse, unknown, InfiniteData<GetWinesResponse>>({
    queryKey: [
      'wines',
      {
        type: debouncedType,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        rating: debouncedRating,
        name: debouncedSearchTerm,
      },
    ],
    queryFn: ({ pageParam = 0 }) => {
      const filters = {
        type: debouncedType.toUpperCase(),
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
        rating: debouncedRating,
        name: debouncedSearchTerm,
      };

      const filteredParams = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== null && value !== undefined),
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
