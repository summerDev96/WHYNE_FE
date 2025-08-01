import { useState } from 'react';

import { toast } from 'sonner';

import { postLike, deleteLike } from '@/api/handleLikeRequest';
import FullLikeIcon from '@/assets/icons/fullLike.svg';
import LikeIcon from '@/assets/icons/like.svg';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import useReviewCardStore from '@/stores/reviewCardStore';

interface Props {
  isLike?: boolean;
  reviewId: number;
}

function LikeButton({ isLike, reviewId }: Props) {
  const [isClicked, setIsClicked] = useState(isLike);

  const { user } = useUser();
  const id = useReviewCardStore((state) => state.allReviews[reviewId]?.user.id);

  async function handleToggle() {
    if (user?.id !== id) {
      setIsClicked((prev) => !prev);
      try {
        isClicked ? await deleteLike(reviewId) : await postLike(reviewId);
      } catch (err) {
        setIsClicked((prev) => !prev); //실패하면 업데이트 했던 거 취소
      }
    } else {
      toast.error('', {
        description: '본인이 작성한 리뷰에는 좋아요를 할 수 없습니다.',
      });
    } //미리 업데이트
  }
  return (
    <>
      <Button
        onClick={handleToggle}
        variant='onlyCancel'
        className={cn(
          'border-0 hover:text-primary w-8 h-8 md:w-9.5 md:h-9.5 mr-4.5 md:mr-5 [&_svg]:w-8 [&_svg]:h-8',
          { 'text-primary': isClicked },
        )}
      >
        {isClicked ? <FullLikeIcon /> : <LikeIcon />}
      </Button>
    </>
  );
}

export default LikeButton;
