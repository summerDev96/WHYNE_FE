import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmModalProps {
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmModal = ({ children, buttons, open, onOpenChange }: ConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent
          className={`max-w-[353px] px-4 pb-6 flex flex-col gap-10 rounded-xl [&>button:last-child]:hidden`}
        >
          <DialogHeader>
            {/* 컨텐츠 영역 */}
            <DialogTitle className='mt-2 flex justify-center text-xl md:text-2xl'>
              {children}
            </DialogTitle>
            <DialogDescription className='sr-only'>다이얼로그 내용</DialogDescription>
          </DialogHeader>
          <DialogFooter className='w-full flex flex-row justify-between gap-2'>
            {buttons}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ConfirmModal;
