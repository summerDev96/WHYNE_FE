import React from 'react';

import { Button } from '@/components/ui/button';

import Modal from './Modal';

interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  showCloseButton?: boolean;
  errorMessage: string;
  children?: React.ReactNode;
}

const ErrorModal = ({
  open,
  onOpenChange,
  onConfirm,
  showCloseButton = false,
  errorMessage,
}: ErrorModalProps) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton={showCloseButton}
      className='max-w-[353px] px-4 pb-6 gap-10'
    >
      <Modal.Header>
        <Modal.Title className='mt-2 flex justify-center custom-text-2lg-bold md:custom-text-xl-bold'>
          {errorMessage}
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
