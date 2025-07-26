import KebabIcon from '@/assets/icons/kebab.svg';
import { Button } from '@/components/ui/button';

import MenuDropdown from '../common/dropdown/MenuDropdown';

function Kebab() {
  //유진님이 만든 거랑 겹치는 거 같은데 나중에 합쳐지면 그걸로 수정해두겠습니다.
  function onSelect(value: string) {
    //-> 요거 혹시 저번에 멘토님께서 제네릭 관련 피드백 해주신 거 반영되어 있을까요???
    if (value === 'update') alert('수정하기 모달 호출');
    if (value === 'delete') alert('정말 삭제하겠습니다 alert 호출');
  }

  return (
    <MenuDropdown
      options={[
        { label: '수정하기', value: 'update' },
        { label: '삭제하기', value: 'delete' },
      ]}
      onSelect={onSelect}
      trigger={
        <Button
          variant='onlyCancel'
          className='border-0 w-8 h-8 md:w-9.5 md:h-9.5 [&_svg]:w-8 [&_svg]:h-8 hover:text-primary'
        >
          <KebabIcon />
        </Button>
      }
    ></MenuDropdown>
  );
}

export default Kebab;
