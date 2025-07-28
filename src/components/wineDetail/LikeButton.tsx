import { useState } from 'react';

import apiClient from '@/api/apiClient';
import FullLikeIcon from '@/assets/icons/fullLike.svg';
import LikeIcon from '@/assets/icons/like.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

async function postLike(reviewId: number) {
  console.log('좋아요!');
  return apiClient.post(`${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}/like`);
}

async function deleteLike(reviewId: number) {
  console.log('싫어요!');
  return apiClient.delete(`${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}/like`);
}

interface Props {
  isLike?: boolean;
  reviewId: number;
}

function LikeButton({ isLike, reviewId }: Props) {
  const [isClicked, setIsClicked] = useState(isLike);

  async function handleToggle() {
    setIsClicked((prev) => !prev); //미리 업데이트
    //좋아요 api 요청 보내기
    // /{teamId}/reviews/{id}/like

    try {
      isClicked === true ? await deleteLike(reviewId) : await postLike(reviewId);
    } catch (err) {
      //모달 호출 후 집어 넣기

      setIsClicked((prev) => !prev); //실패하면 업데이트 했던 거 취소
    }
  }

  return (
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
  );
}

export default LikeButton;
