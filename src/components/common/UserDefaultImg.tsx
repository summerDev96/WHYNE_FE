import React from 'react';

import { cn } from '@/lib/utils';

import DefaultImg from '@/assets/userDefaultImg.svg';

interface Props {
  className?: string;
}

function UserDefaultImg({ className }: Props) {
  return (
    <div className={cn('text-gray-100 w-[20px] md:w-[45px] h-[20px] md:h-[45px]', className)}>
      <DefaultImg />
    </div>
  );
}

export default UserDefaultImg;
