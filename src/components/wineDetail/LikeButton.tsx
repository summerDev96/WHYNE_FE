import LikeIcon from '@/assets/like.svg';
import { Button } from '@/components/ui/button';

function LikeButton() {
  return (
    <Button
      variant='onlyCancel'
      className='border-0 hover:text-primary w-8 h-8 md:w-9.5 md:h-9.5 mr-4.5 md:mr-5
    [&_svg]:w-8 [&_svg]:h-8'
    >
      <LikeIcon />
    </Button>
  );
}

export default LikeButton;
