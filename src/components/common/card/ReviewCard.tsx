import React from 'react';

import ShowMoreBtn from '@/assets/icons/showMoreBtn.svg';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useClickToggle from '@/hooks/useClickToggle';
import { cn } from '@/lib/utils';

/*
  여기 저 혼자만 사용하는 것 같아서 
  제가 임의로 간격이나 이런 수치들 조금 건드렸습니다. 
  혹시 다른 분들도 쓰게 된다면 말씀해주세요
*/

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
  const { isOpen, onToggle } = useClickToggle();
  const cardTransition = cn('overflow-hidden transition-all duration-500 ease-in-out', {
    'opacity-100 translate-y-0 max-h-[1000px]': isOpen,
    'opacity-0 -translate-y-4 max-h-0': !isOpen,
  });

  return (
    <div
      className={cn(
        'w-full rounded-xl bg-white p-4 md:p-8 xl:p-4 xl:px-6 shadow-sm border border-gray-300 md:pb-6 xl:pb-5',
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
          {tags.map((tag) => (
            <Badge
              key={tag + username}
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
        <p
          className={cn(
            'mt-9 text-[14px] md:text-[16px] leading-6 md:leading-[26px] text-gray-800',
            cardTransition,
          )}
        >
          {reviewText}
        </p>
      )}

      {/* 슬라이더 */}
      {flavorSliderSlot && (
        <div className={cn('mt-4 md:mt-6 xl:mt-5', cardTransition)}>{flavorSliderSlot}</div>
      )}
      <Button
        size={null} //버튼 디폴트 덮어씌우기
        width={null}
        variant='onlyCancel'
        onClick={onToggle}
        className={cn(
          'border-0 mx-auto  [&_svg]:w-[30px] [&_svg]:h-[30px] block transition-all duration-500 ease-in-out mt-[-30px]',
          {
            'scale-y-[-1] mt-0': isOpen,
          },
        )}
      >
        <ShowMoreBtn />
      </Button>
    </div>
  );
}
