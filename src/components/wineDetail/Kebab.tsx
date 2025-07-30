import { useState } from 'react';

import KebabIcon from '@/assets/icons/kebab.svg';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import useReviewCardStore from '@/stores/reviewCardStore';
import useWineStore from '@/stores/wineStore';

import MenuDropdown from '../common/dropdown/MenuDropdown';
import ErrorModal from '../common/Modal/ErrorModal';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import EditReviewModal from '../Modal/ReviewModal/EditReviewModal';

interface Props {
  reviewId: number;
}

function Kebab({ reviewId }: Props) {
  const nowWine = useWineStore((state) => state.nowWine);
  const reviewData = useReviewCardStore((state) => state.allReviews[reviewId]);
  const [openEditModal, setOepnEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  const { user } = useUser();

  function onSelect(value: string) {
    switch (value) {
      case 'update': {
        if (user?.id !== reviewData.user.id) setOpenAlertModal(true);
        else {
          setOepnEditModal(true);
        }
        break;
      }
      case 'delete': {
        setOpenDeleteModal(true);
        break;
      }
    }
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
          showEditModal={openEditModal}
          setShowEditModal={setOepnEditModal}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          type='review'
          id={reviewData.id}
          showDeleteModal={openDeleteModal}
          setShowDeleteModal={setOpenDeleteModal}
        />
      )}
      {openAlertModal && (
        <ErrorModal
          open={openAlertModal}
          onOpenChange={() => {}}
          onConfirm={() => setOpenAlertModal(false)}
        >
          <div className='custom-text-lg-bold'>권한이 없습니다.</div>
        </ErrorModal>
      )}
    </>
  );
}

export default Kebab;
