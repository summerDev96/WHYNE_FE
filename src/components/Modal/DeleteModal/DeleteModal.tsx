import { useState } from 'react';

import { deleteWine } from '@/api/delete';
import BasicModal from '@/components/common/Modal/BasicModal';
import { Button } from '@/components/ui/button';

const DeleteModal = ({ wineId }: { wineId: number }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onSubmit = async (wineId: number) => {
    try {
      await deleteWine(wineId);
      setShowDeleteModal(false);
    } catch (error) {
      console.log('삭제실패 : ', error);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowDeleteModal(true)}>삭제하기</Button>
      <BasicModal
        type='register'
        title=''
        open={showDeleteModal}
        onOpenChange={(isOpen: boolean) => setShowDeleteModal(isOpen)}
        showCloseButton={false}
        buttons={
          <div className='flex w-full gap-2'>
            <Button
              onClick={() => setShowDeleteModal(false)}
              type='button'
              variant='onlyCancel'
              size='xl'
              width='full'
              fontSize='lg'
            >
              취소
            </Button>
            <Button
              onClick={() => onSubmit(wineId)}
              type='button'
              variant='purpleDark'
              size='xl'
              width='full'
              fontSize='lg'
            >
              삭제
            </Button>
          </div>
        }
      >
        <span className='flex justify-center mb-8 custom-text-2lg-bold md:custom-text-xl-bold'>
          정말로 삭제하시겠습니까?
        </span>
      </BasicModal>
    </div>
  );
};
export default DeleteModal;
