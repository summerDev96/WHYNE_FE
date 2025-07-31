import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteReview, deleteWine, DeleteResponse } from '@/api/delete';
import BasicBottomSheet from '@/components/common/BottomSheet/BasicBottomSheet';
import BasicModal from '@/components/common/Modal/BasicModal';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface DeleteModalProps {
  type: 'wine' | 'review';
  id: number;
  showDeleteModal: boolean;
  setShowDeleteModal: (state: boolean) => void;
}

const DeleteModal = ({ type, id, showDeleteModal, setShowDeleteModal }: DeleteModalProps) => {
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const deleteWineMutation = useMutation<DeleteResponse, AxiosError, number>({
    mutationFn: (id) => deleteWine(id),
    throwOnError: true,
  });
  const deleteReviewMutation = useMutation<DeleteResponse, AxiosError, number>({
    mutationFn: (id) => deleteReview(id),
    throwOnError: true,
  });

  const handleDelete = () => {
    if (type === 'wine') {
      deleteWineMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['wines'] }); //삭제후 관련데이터 바로 갱신
          console.log('와인 삭제 성공');
          setShowDeleteModal(false);
        },
        onError: (error) => {
          console.error('와인 삭제 실패', error);
        },
      });
    } else if (type === 'review') {
      deleteReviewMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['reviews'] });
          queryClient.invalidateQueries({ queryKey: ['wineDetail'] });
          console.log('리뷰 삭제 성공');
          setShowDeleteModal(false);
        },
        onError: (error) => {
          console.error('리뷰 삭제 실패', error);
        },
      });
    }
  };

  const buttons = (
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
  );

  return isDesktop ? (
    <BasicModal
      type='register'
      title=''
      open={showDeleteModal}
      onOpenChange={(isOpen: boolean) => setShowDeleteModal(isOpen)}
      showCloseButton={false}
    >
      <span className='flex justify-center mb-8 custom-text-2lg-bold md:custom-text-xl-bold'>
        정말로 삭제하시겠습니까?
      </span>
      {buttons}
    </BasicModal>
  ) : (
    <BasicBottomSheet
      open={showDeleteModal}
      onOpenChange={setShowDeleteModal}
      title='정말로 삭제하시겠습니까?'
    >
      {buttons}
    </BasicBottomSheet>
  );
};
export default DeleteModal;
