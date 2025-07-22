import { useState } from 'react';

import BasicModal from '../common/Modal/BasicModal';
import { Button } from '../ui/button';

const AddWineModal = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  //    const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div>
      <Button size='onlyLanding' width='onlyLanding' onClick={() => setShowRegisterModal(true)}>
        와인 등록하기
      </Button>
      <BasicModal
        type='register'
        title='와인 등록'
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        buttons={
          <>
            <Button variant='onlyCancel' size='xl' width='full' fontSize='lg'>
              취소
            </Button>
            <Button variant='purpleDark' size='xl' width='full' fontSize='lg'>
              와인 등록하기
            </Button>
          </>
        }
      >
        <div>와인이름</div>
        인풋
        <div>가격</div>
      </BasicModal>
    </div>
  );
};

export default AddWineModal;
