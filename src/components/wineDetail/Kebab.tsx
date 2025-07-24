import KebabIcon from '@/assets/icons/kebab.svg';
import { Button } from '@/components/ui/button';

function Kebab() {
  return (
    <Button
      variant='onlyCancel'
      className='border-0 w-8 h-8 md:w-9.5 md:h-9.5
    [&_svg]:w-8 [&_svg]:h-8 hover:text-primary'
    >
      <KebabIcon />
    </Button>
  );
}

export default Kebab;
