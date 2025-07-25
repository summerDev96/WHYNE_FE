import React from 'react';

export type ModalType = 'register' | 'review' | 'filter';

export type ModalProps = {
  type?: ModalType;
  children?: React.ReactNode;

  showCloseButton?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

export type ModalHeaderProps = {
  children?: React.ReactNode;
  title?: string;
};

export type ModalTitleProps = {
  title?: string;
  className?: string;
};

export type ModalBodyProps = {
  children?: React.ReactNode;
};
export type ModalFooterProps = {
  children?: React.ReactNode;
};

export type ModalContentProps = {
  children: React.ReactNode;
  type?: ModalType;
  showCloseButton: boolean;
};
