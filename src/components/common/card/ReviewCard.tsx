import ShowMoreBtn from '@/assets/icons/showMoreBtn.svg';
import Star from '@/assets/icons/star.svg';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useReviewCardStore from '@/stores/reviewCardStore';

import {
  ReviewCardProps,
  UserHeaderProps,
  TagAndRatingProps,
  ReviewBodyProps,
  ToggleButtonProps,
} from './ReviewCardTypes';

/*
  여기 저 혼자만 사용하는 것 같아서 
  제가 임의로 건드렸습니다. 
  혹시 다른 분들도 쓰게 된다면 말씀해주세요
*/
export function ReviewCard({ children }: ReviewCardProps) {
  return (
    <div className='rounded-xl bg-white p-4 md:p-8 xl:p-4 xl:px-6 shadow-sm border border-gray-300 md:pb-6 xl:pb-5 w-full xl:w-[800px]'>
      {children}
    </div>
  );
}

ReviewCard.UserHeader = function UserHeader({ userIcon, reviewId, children }: UserHeaderProps) {
  const username = useReviewCardStore((state) => state.allReviews[reviewId]?.user.name);
  const timeAgo = useReviewCardStore((state) => state.allReviews[reviewId]?.updatedAt);

  return (
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
      <div className='flex items-center gap-2'>{children}</div>
    </div>
  );
};

ReviewCard.TagAndRating = function TagAndRating({ reviewId }: TagAndRatingProps) {
  const tags = useReviewCardStore((state) => state.allReviews[reviewId]?.aroma ?? []);
  const rating = useReviewCardStore((state) => state.allReviews[reviewId]?.rating);
  return (
    <div className='mt-3 flex justify-between items-center'>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <Badge
            key={tag}
            className='mt-4 rounded-full bg-white border-gray-300 px-[10px] py-[6px] md:px-[15px] md:py-2 custom-text-lg-regular text-gray-700'
            variant='flavor'
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Badge variant='star' className='inline-flex gap-1 items-center'>
        <Star className='size-3 md:size-4 md:mt-[-2px]' /> {rating}
      </Badge>
    </div>
  );
};

ReviewCard.ReviewBody = function ReviewBody({ reviewId, flavorSliderSlot }: ReviewBodyProps) {
  const reviewText = useReviewCardStore((state) => state.allReviews[reviewId]?.content);
  const isOpen = useReviewCardStore((state) => state.allReviews[reviewId]?.isOpen);

  const cardTransition = cn('overflow-hidden transition-all duration-500 ease-in-out', {
    'opacity-100 translate-y-0 max-h-[1000px]': isOpen,
    'opacity-0 -translate-y-4 max-h-0': !isOpen,
  });

  if (!reviewText && !flavorSliderSlot) null;

  return (
    <div className={cardTransition}>
      <p className='mt-9 text-[14px] md:text-[16px] leading-6 md:leading-[26px] text-gray-800'>
        {reviewText}
      </p>
      <div className='mt-4 md:mt-6 xl:mt-5'>{flavorSliderSlot}</div>
    </div>
  );
};

ReviewCard.ToggleButton = function TogleButton({ reviewId }: ToggleButtonProps) {
  const isOpen = useReviewCardStore((state) => state.allReviews[reviewId]?.isOpen);
  const toggleReviewOpen = useReviewCardStore((state) => state.toggleReviewOpen);
  return (
    <Button
      size={null} //버튼 디폴트 덮어씌우기
      width={null}
      variant='onlyCancel'
      onClick={() => toggleReviewOpen(reviewId)}
      className={cn(
        'border-0 mx-auto [&_svg]:w-[30px] [&_svg]:h-[30px] block transition-all duration-500 ease-in-out',
        {
          'scale-y-[-1] mt-0': isOpen,
        },
      )}
    >
      <ShowMoreBtn />
    </Button>
  );
};
