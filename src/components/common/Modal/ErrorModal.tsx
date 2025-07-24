import ConfirmModal from '@/components/common/Modal/ConfirmModal';
import { Button } from '@/components/ui/button';

interface ErrorModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  errorMessage: string;
}

const ErrorModal = ({ open, onOpenChange, errorMessage }: ErrorModalProps) => {
  return (
    <ConfirmModal
      open={open}
      onOpenChange={onOpenChange}
      /* 버튼커스텀 영역 */
      buttons={
        <>
          <Button
            size='xl'
            width='xl'
            variant='purpleDark'
            className='flex-auto text-base font-bold'
            onClick={() => onOpenChange(false)}
          >
            확인
          </Button>
        </>
      }
    >
      {/* 모달 내용 영역 */}
      {errorMessage}
    </ConfirmModal>
  );
};

export default ErrorModal;
