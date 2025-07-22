import React from 'react';

import DefaultImg from '@/assets/userDefaultImg.svg';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

function UserDefaultImg({ className }: Props) {
  return (
    <div className={cn('text-white w-[20px] md:w-[45px] h-[20px] md:h-[45px]', className)}>
      <DefaultImg />
    </div>
  );
}

export default UserDefaultImg;
