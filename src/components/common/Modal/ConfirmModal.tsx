import React from 'react';

import Modal from './Modal';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  showCloseButton?: boolean;
}

const ConfirmModal = ({
  open,
  onOpenChange,
  buttons,
  showCloseButton = false,
  children,
}: ConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showCloseButton={showCloseButton}
      className='max-w-[353px] px-4 pb-6 gap-10'
    >
      <Modal.Header>
        <Modal.Title className='mt-2 flex justify-center custom-text-2lg-bold md:custom-text-xl-bold'>
          {children}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>{buttons}</Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
