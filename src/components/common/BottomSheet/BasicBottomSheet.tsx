import React from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';

interface BasicBottomSheetProps {
  title?: string;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BasicBottomSheet = ({
  open,
  onOpenChange,
  title,
  children,
  buttons,
}: BasicBottomSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        {title && (
          <DrawerHeader className='text-left'>
            <DrawerTitle className='custom-text-xl-bold'>{title}</DrawerTitle>
          </DrawerHeader>
        )}

        <div className='px-4 py-2'>{children}</div>

        {buttons && (
          <DrawerFooter className='flex flex-col gap-2 px-4 pb-4'>{buttons}</DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default BasicBottomSheet;
