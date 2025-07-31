import React from 'react';

import { cn } from '@/lib/utils';

interface OverlayProps {
  className?: string;
  children?: React.ReactNode;
}

export function Overlay({ className, children }: OverlayProps) {
  return (
    <div
      className={cn(
        'fixed z-[60] bg-black/40 min-h-screen w-full flex items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
