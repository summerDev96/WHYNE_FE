import React from 'react';

import Close from '@/assets/icons/close.svg';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalTitleProps,
} from '@/types/ModalTypes';

const Modal = ({ open, onOpenChange, showCloseButton = true, children, className }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'flex flex-col rounded-xl max-h-[95vh] [&>button:last-child]:hidden',
          className,
        )}
      >
        {showCloseButton && (
          <DialogClose asChild>
            <button
              className='absolute top-4 right-5 focus:outline-none focus:border-none'
              aria-label='Close'
            >
              <Close width={24} height={24} className='text-gray-500' />
            </button>
          </DialogClose>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

Modal.Header = function Header({ children }: ModalHeaderProps) {
  return (
    <DialogHeader>
      {children}
      <DialogDescription className='sr-only'>다이얼로그 내용</DialogDescription>
    </DialogHeader>
  );
};

Modal.Title = function Title({ title, className, children }: ModalTitleProps) {
  return <DialogTitle className={className}>{children ?? title}</DialogTitle>;
};

Modal.Body = function Body({ children }: ModalBodyProps) {
  return (
    <div className='overflow-y-auto overflow-x-hidden max-h-[calc(95vh - 10rem)]'>{children}</div>
  );
};

Modal.Footer = function Footer({ children }: ModalFooterProps) {
  return (
    <DialogFooter className='w-full flex flex-row justify-between gap-2'>{children}</DialogFooter>
  );
};

export default Modal;
