import React from 'react';

import { cn } from '@/lib/utils';

interface HeroSectionLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const HeroSectionLayout = ({ children, className }: HeroSectionLayoutProps) => {
  const baseClass = 'absolute w-[240px] h-[185px] rounded-xl shadow-xl';

  return <div className={cn(baseClass, className)}>{children}</div>;
};

export default HeroSectionLayout;
