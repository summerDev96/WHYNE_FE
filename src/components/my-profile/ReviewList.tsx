import React, { useEffect, useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyReviews } from '@/api/myReviews';
import DotIcon from '@/assets/icons/dot.svg';
import { MyCard } from '@/components/common/card/MyCard';
import MenuDropdown from '@/components/common/dropdown/MenuDropdown';
import { Badge } from '@/components/ui/badge';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { MyReview } from '@/types/MyReviewsTypes';

const PAGE_LIMIT = 10;

interface ReviewListProps {
  setTotalCount: (count: number) => void;
}
/**
 * ReviewList 컴포넌트
 *
 * 무한 스크롤을 통해 사용자의 리뷰 목록을 페이징하여 불러옴
 * IntersectionObserver로 스크롤 끝에 도달 시 다음 페이지를 자동으로 로드
 *
 */
export function ReviewList({ setTotalCount }: ReviewListProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  // useInfiniteQuery 훅으로 리뷰 데이터를 무한 스크롤 형태로 조회
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['myReviews'],
      queryFn: ({ pageParam = 0 }) => getMyReviews({ cursor: pageParam, limit: PAGE_LIMIT }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    });
  // xhx
  useEffect(() => {
    if (data?.pages?.[0]?.totalCount != null) {
      setTotalCount(data.pages[0].totalCount);
    }
  }, [data, setTotalCount]);

  // IntersectionObserver 훅 적용으로 스크롤 끝 감지
  useInfiniteScroll({
    targetRef: observerRef,
    hasNextPage,
    fetchNextPage,
    isFetching: isFetchingNextPage,
  });

  // 로딩 및 에러 상태 처리 (임시)
  if (isLoading) return <p>불러오는 중…</p>;
  if (isError) return <p>불러오기 실패</p>;
  if (!data) return <p>리뷰 데이터가 없습니다.</p>;

  // 리뮤 목록 평탄화
  const reviews: MyReview[] = data?.pages?.flatMap((page) => page.list ?? []) ?? [];

  return (
    <div className='space-y-4 mt-4'>
      {reviews.map((review) => (
        <MyCard
          key={review.id}
          rating={
            <Badge variant='star'>
              <span className='inline-block w-full h-full pt-[2px]'>
                ★ {review.rating.toFixed(1)}
              </span>
            </Badge>
          }
          timeAgo={new Date(review.createdAt).toLocaleDateString()}
          title={review.user.nickname}
          review={review.content}
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
              onSelect={(value) => console.log(`${value} clicked: review id=${review.id}`)}
            />
          }
        />
      ))}
      {/* 옵저버 감지 요소 */}
      <div ref={observerRef} className='w-1 h-1' />
    </div>
  );
}
