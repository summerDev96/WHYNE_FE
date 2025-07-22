import React from 'react';

import Link from 'next/link';

import LogoIcon from '@/assets/logo.svg';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

function Logo({ className }: Props) {
  return (
    <Link href='/' className={cn('text-white w-[52px] h-[15px]', className)}>
      <LogoIcon />
    </Link>
  );
}

export default Logo;
