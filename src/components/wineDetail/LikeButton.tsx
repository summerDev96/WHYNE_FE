import { useState } from 'react';

import FullLikeIcon from '@/assets/icons/fullLike.svg';
import LikeIcon from '@/assets/icons/like.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  isLike?: boolean;
}

function LikeButton({ isLike }: Props) {
  const [isClicked, setIsClicked] = useState(isLike);

  function handleToggle() {
    setIsClicked(!isClicked);
    //좋아요 api 요청 보내기
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
