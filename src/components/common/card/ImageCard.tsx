import React from 'react';

import { cn } from '@/lib/utils';

interface ImageCardProps {
  imageSrc: string; // 좌측 이미지
  children?: React.ReactNode; // 우측 텍스트
  rightSlot?: React.ReactNode; // 오른쪽 상단 버튼
  className?: string; // 컨테이너 클래스
  imageClassName?: string; // 이미지 클래스
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
        <img
          src={imageSrc}
          alt='와인 이미지'
          className={cn('h-28 w-20 rounded-md object-cover', imageClassName)}
        />
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
