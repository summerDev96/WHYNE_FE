import React, { useEffect, useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyWines } from '@/api/myWines';
import DotIcon from '@/assets/icons/dot.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import MenuDropdown from '@/components/common/dropdown/MenuDropdown';
import { Badge } from '@/components/ui/badge';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import type { MyWine, MyWinesResponse } from '@/types/MyWinesTypes';

const PAGE_LIMIT = 10;

/**
 * WineList 컴포넌트
 *
 * 무한 스크롤을 통해 사용자의 와인 목록을 페이징하여 불러옴
 * IntersectionObserver로 스크롤 끝에 도달 시 추가 페이지를 자동으로 로드
 *
 */
export function WineList() {
  const observerRef = useRef<HTMLDivElement | null>(null);

  //useInfiniteQuery 훅으로 와인 데이터를 무한 스크롤 형태로 조회
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['myWines'],
      queryFn: ({ pageParam = 0 }) => getMyWines({ cursor: pageParam, limit: PAGE_LIMIT }),
      initialPageParam: 0,
      getNextPageParam: (lastPage: MyWinesResponse | undefined) => lastPage?.nextCursor ?? null,
    });

  useEffect(() => {
    console.log('[WineList] pages raw:', data?.pages);
  }, [data?.pages]);
  // IntersectionObserver 훅 적용으로 스크롤 끝 감지
  useInfiniteScroll({
    targetRef: observerRef,
    hasNextPage: !!hasNextPage,
    fetchNextPage,
    isFetching: isFetchingNextPage,
  });

  // 로딩 및 에러 상태 처리 (임시)
  if (isLoading) return <p className='text-center py-4'>와인 불러오는 중…</p>;
  if (isError || !data) return <p className='text-center py-4'>와인 불러오기 실패</p>;

  // 와인 목록 평탄화
  const wines: MyWine[] = data?.pages?.flatMap((page) => page?.list ?? []) ?? [];

  return (
    <div className='flex flex-col mt-9 space-y-9 md:space-y-16 md:mt-16'>
      {wines.map((wine) => (
        <ImageCard
          key={wine.id}
          className='relative pl-24 min-h-[164px] md:min-h-[228px] md:pl-44 md:pt-10'
          imageSrc={wine.image}
          imageClassName='object-contain absolute left-3 bottom-0 h-[185px] md:h-[270px] md:left-12'
          rightSlot={
            <MenuDropdown
              trigger={
                <button className='w-6 h-6 text-gray-500 hover:text-primary transition-colors'>
                  <DotIcon />
                </button>
              }
              options={[
                { label: '수정하기', value: 'edit' },
                { label: '삭제하기', value: 'delete' },
              ]}
              onSelect={(value) => console.log(`${value} clicked for wine id: ${wine.id}`)}
            />
          }
        >
          <div className='flex flex-col items-start justify-center h-full'>
            <h4 className='text-xl/6 font-semibold text-gray-800 mb-4 md:text-3xl md:mb-5'>
              {wine.name}
            </h4>
            <p className='custom-text-md-legular text-gray-500 mb-2 md:custom-text-lg-legular md:mb-4'>
              {wine.region}
            </p>
            <Badge variant='priceBadge'>
              <span className='inline-block w-full h-full pt-[3px]'>
                ₩ {wine.price.toLocaleString()}
              </span>
            </Badge>
          </div>
        </ImageCard>
      ))}
      {/* 옵저버 감지 요소 */}
      <div ref={observerRef} className='w-1 h-1' />
    </div>
  );
}
