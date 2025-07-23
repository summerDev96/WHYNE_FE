import React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  userIcon: React.ReactNode; // 유저 아이콘
  username: string; // 유저 이름
  timeAgo: string; // 작성 시간
  tags: string[]; // 태그 목록
  rating: React.ReactNode; // 별점 영역 slot
  likeSlot: React.ReactNode; // 좋아요 버튼 slot
  menuSlot: React.ReactNode; // 메뉴 버튼 slot
  reviewText?: string; // 리뷰 목록
  flavorSliderSlot?: React.ReactNode; // 슬라이더
  className?: string; // 컨테이너 클래스
}

export function ReviewCard({
  userIcon,
  username,
  timeAgo,
  tags,
  rating,
  likeSlot,
  menuSlot,
  reviewText,
  flavorSliderSlot,
  className,
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-xl bg-white p-4 md:p-8 xl:p-4 shadow-sm border border-gray-300',
        className,
      )}
    >
      {/* 상단: 유저 정보 & 우측 slot */}
      <div className='flex justify-between items-start'>
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 md:w-16 md:h-16 rounded-full bg-gray-200 overflow-hidden'>
            {userIcon}
          </div>
          <div className='flex flex-col'>
            <span className='custom-text-lg-semibold text-gray-900'>{username}</span>
            <span className='custom-text-md-regular  text-gray-500'>{timeAgo}</span>
          </div>
        </div>

        {/* 좋아요 & 메뉴 */}
        <div className='flex items-center gap-2'>
          {likeSlot}
          {menuSlot}
        </div>
      </div>

      {/* 태그 & 별점 */}
      <div className='mt-3 flex justify-between items-center'>
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag, idx) => (
            <Badge
              key={idx}
              className='mt-4 rounded-full bg-white border-gray-300 px-[10px] py-[6px] md:px-[15px] md:py-2 custom-text-lg-regular text-gray-700'
              variant='flavor'
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Badge variant='star'>{rating}</Badge>
      </div>

      {/* 리뷰 텍스트 */}
      {reviewText && (
        <p className='mt-5 text-[14px] md:text-[16px] leading-6 md:leading-[26px] text-gray-800'>
          {reviewText}
        </p>
      )}

      {/* 슬라이더 */}
      {flavorSliderSlot && <div className='mt-4 md:mt-6 xl:mt-5'>{flavorSliderSlot}</div>}
    </div>
  );
}
