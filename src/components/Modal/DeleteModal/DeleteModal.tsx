import React, { useState } from 'react';

import { deleteWine } from '@/api/delete';
import { deleteReview } from '@/api/delete';
import BasicModal from '@/components/common/Modal/BasicModal';
import { Button } from '@/components/ui/button';

interface DeleteModalProps {
  type: 'wine' | 'review';
  id: number;
  trigger: React.ReactNode;
}

const DeleteModal = ({ type, id, trigger }: DeleteModalProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      if (type === 'wine') {
        await deleteWine(id);
        console.log('와인 삭제 성공');
      } else if (type === 'review') {
        await deleteReview(id);
        console.log('리뷰 삭제 성공');
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.log('삭제실패 : ', error);
    }
  };

  return (
    <div>
      <span onClick={() => setShowDeleteModal(true)}>{trigger}</span>
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
              onClick={handleDelete}
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
