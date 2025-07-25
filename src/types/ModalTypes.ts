import React from 'react';

export type ModalType = 'register' | 'review' | 'filter';

export type ModalProps = {
  children: React.ReactNode;
};

export type ModalState = {
  type?: ModalType;
  title?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
};
