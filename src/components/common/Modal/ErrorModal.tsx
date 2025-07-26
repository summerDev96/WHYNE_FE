import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import Modal from './Modal';

interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  showCloseButton?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/* 기존에 errorMessage를 props로 받았는데,
줄바꿈 처리가 불편할 것 같아 children으로 받도록 수정하였습니다 */

const ErrorModal = ({
  open,
  onOpenChange,
  onConfirm,
  showCloseButton = false,
  children,
  className,
}: ErrorModalProps) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton={showCloseButton}
      className={cn('max-w-[353px] px-4 pb-6 gap-10', className)}
    >
      <Modal.Header>
        <Modal.Title className='mt-2 flex justify-center custom-text-2lg-bold md:custom-text-xl-bold'>
          {children}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          size='xl'
          width='xl'
          variant='purpleDark'
          className='flex-auto text-base font-bold focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none'
          onClick={() => {
            onOpenChange(false);
            onConfirm?.();
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
