import KebabIcon from '@/assets/kebab.svg';
import { Button } from '@/components/ui/button';

function Kebab() {
  return (
    <Button
      variant='onlyCancel'
      className='border-0 w-8 h-8 md:w-9.5 md:h-9.5
    [&_svg]:w-8 [&_svg]:h-8'
    >
      {/* hover:text-primary 이거 설정 주려면 next.config에서 cicle도 fill속성 없애줘야함*/}
      <KebabIcon />
    </Button>
  );
}

export default Kebab;
