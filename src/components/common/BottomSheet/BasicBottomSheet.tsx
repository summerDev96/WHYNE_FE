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
  contentLayer?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BasicBottomSheet = ({
  open,
  onOpenChange,
  title,
  children,
  buttons,
  contentLayer,
}: BasicBottomSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={contentLayer}>
        {title && (
          <DrawerHeader className='text-left'>
            <DrawerTitle className='custom-text-xl-bold'>{title}</DrawerTitle>
          </DrawerHeader>
        )}

        <div className='px-4 py-2 px-4 py-2 max-h-[60vh] overflow-y-auto'>{children}</div>

        {buttons && (
          <DrawerFooter className='flex flex-col gap-2 px-4 pb-4 '>{buttons}</DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default BasicBottomSheet;
