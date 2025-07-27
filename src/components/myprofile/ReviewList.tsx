import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getMyReviews } from '@/api/myReviews';
import DotIcon from '@/assets/icons/dot.svg';
import { MyCard } from '@/components/common/card/MyCard';
import MenuDropdown from '@/components/common/dropdown/MenuDropdown';
import { Badge } from '@/components/ui/badge';
import { MyReviewsResponse, MyReview } from '@/types/MyReviewsTypes';

/**
 * ReviewList 컴포넌트
 * - React Query의 useQuery 훅을 사용해 리뷰 데이터를 패칭
 * - 로딩 및 에러 상태를 처리한 뒤, MyCard 컴포넌트로 리스트를 렌더링
 */
export function ReviewList() {
  const LIMIT = 10;

  // React Query로 리뷰 데이터 요청
  const { data, isLoading, isError } = useQuery<MyReviewsResponse, Error>({
    queryKey: ['myReviews', { cursor: 0, limit: LIMIT }],
    queryFn: () => getMyReviews(0, LIMIT),
    staleTime: 5 * 60 * 1000,
  });

  // 로딩 중 표시
  if (isLoading) {
    return <p className='text-center py-4'>리뷰 불러오는 중…</p>;
  }

  // 에러 시 표시
  if (isError || !data) {
    return <p className='text-center py-4'>리뷰 불러오기 실패</p>;
  }
  // **데이터 확인용 로그**
  console.log('✔ ReviewsResponse:', data);

  // 실제 리뷰 리스트 렌더링
  return (
    <div className='space-y-4 mt-4'>
      {data.list.map((review: MyReview) => (
        <MyCard
          key={review.id}
          // 별점 뱃지
          rating={
            <Badge variant='star'>
              <span className='inline-block w-full h-full pt-[2px]'>
                ★ {review.rating.toFixed(1)}
              </span>
            </Badge>
          }
          // 작성일
          timeAgo={new Date(review.createdAt).toLocaleDateString()}
          // 작성자 닉네임
          title={review.user.nickname}
          // 리뷰 내용
          review={review.content}
          // dot 아이콘 클릭 시 드롭다운 오픈
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
              onSelect={(value) => console.log(`${value} clicked for review id: ${review.id}`)}
            />
          }
        />
      ))}
    </div>
  );
}
