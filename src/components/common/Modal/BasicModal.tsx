import React from 'react';

import Modal from './Modal';

interface BasicModalProps {
  type?: 'register' | 'review' | 'filter';
  title?: string;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  showCloseButton?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BasicModal = ({
  open,
  onOpenChange,
  buttons,
  title,
  type = 'register',
  showCloseButton,
  children,
}: BasicModalProps) => {
  const contentClass = {
    register: 'w-full max-w-[375px] md:max-w-none md:w-[460px]',
    review: 'w-full max-w-[375px] md:max-w-none md:w-[528px]',
    filter: 'max-w-[375px]',
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      type={type}
      showCloseButton={showCloseButton}
      className={contentClass[type]}
    >
      <Modal.Header>
        <Modal.Title
          title={title}
          className='custom-text-xl-bold md:custom-text-2xl-bold text-left'
        ></Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>{buttons}</Modal.Footer>
    </Modal>
  );
};

export default BasicModal;
