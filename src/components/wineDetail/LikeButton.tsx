import { useState } from 'react';

import { QueryClient, useMutation } from '@tanstack/react-query';

import { postLike, deleteLike } from '@/api/handleLikeRequest';
import FullLikeIcon from '@/assets/icons/fullLike.svg';
import LikeIcon from '@/assets/icons/like.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  isLike?: boolean;
  reviewId: number;
}

const queryClient = new QueryClient();

export function usePostLikeMutation() {
  return useMutation({
    mutationFn: (reviewId: number) => postLike(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wineDetail'] }); // 필요한 캐시 무효화
    },
    throwOnError: true,
  });
}

export function useDeleteLikeMutation() {
  return useMutation({
    mutationFn: (reviewId: number) => deleteLike(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wineDetail'] });
    },
    throwOnError: true,
  });
}

function LikeButton({ isLike, reviewId }: Props) {
  const [isClicked, setIsClicked] = useState(isLike);
  const postLikeMutation = usePostLikeMutation();
  const deleteLikeMutation = useDeleteLikeMutation();

  async function handleToggle() {
    setIsClicked((prev) => !prev); //미리 업데이트

    try {
      isClicked
        ? await deleteLikeMutation.mutateAsync(reviewId)
        : await postLikeMutation.mutateAsync(reviewId);
    } catch (err) {
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
