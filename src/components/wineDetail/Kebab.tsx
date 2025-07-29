import { useState } from 'react';

import KebabIcon from '@/assets/icons/kebab.svg';
import { Button } from '@/components/ui/button';
import useReviewCardStore from '@/stores/reviewCardStore';
import useWineStore from '@/stores/wineStore';

import MenuDropdown from '../common/dropdown/MenuDropdown';
import EditReviewModal from '../Modal/ReviewModal/EditReviewModal';

interface Props {
  reviewId: number;
}

function Kebab({ reviewId }: Props) {
  const nowWine = useWineStore((state) => state.nowWine);
  const reviewData = useReviewCardStore((state) => state.allReviews[reviewId]);
  const [isOpen, setIsOpen] = useState(false);

  function onSelect(value: string) {
    if (value === 'update') setIsOpen(true);
    if (value === 'delete') alert('정말 삭제하겠습니다 alert 호출');
  }

  return (
    <>
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
      {nowWine && reviewData && (
        <EditReviewModal
          wineName={nowWine.name}
          reviewData={reviewData}
          showEditModal={isOpen}
          setShowEditModal={setIsOpen}
        />
      )}
    </>
  );
}

export default Kebab;
