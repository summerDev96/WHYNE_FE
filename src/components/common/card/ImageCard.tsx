import React from 'react';

import Image from 'next/image';

import WinePlaceholder from '@/assets/icons/wine-placeholder.svg';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  imageSrc: string;
  children?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
  imageClassName?: string;
}

export function ImageCard({
  imageSrc,
  children,
  rightSlot,
  className,
  imageClassName,
}: ImageCardProps) {
  return (
    <div className={cn('flex w-full rounded-xl bg-white p-4 border border-gray-300', className)}>
      {/* 왼쪽 이미지 */}
      <div className='flex-shrink-0'>
        {imageSrc !== '' ? (
          <Image
            src={imageSrc}
            alt='와인 이미지'
            width={80}
            height={112}
            className={cn('h-28 w-20 rounded-md object-cover', imageClassName)}
            onError={WinePlaceholder}
          />
        ) : (
          <div className={cn('text-primary', imageClassName, 'bottom-[-10px]')}>
            <WinePlaceholder />
          </div>
        )}
      </div>

      {/* 오른쪽 텍스트 & 상단 버튼 */}
      <div className='ml-4 flex flex-1 flex-col justify-between'>
        <div className='flex justify-between'>
          <div className='text-sm text-gray-900'>{children}</div>
          {rightSlot && <div>{rightSlot}</div>}
        </div>
      </div>
    </div>
  );
}
