import React from 'react';

import StarIcon from '@/assets/icons/Star.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import { cn } from '@/lib/utils';

interface WineCardProps {
  image: string;
  name: string;
  rating: number;
}

export default function WineCard({ image, name, rating }: WineCardProps) {
  return (
    <div className='flex w-[150px] md:w-[160px] bg-white p-2 rounded-lg shadow-sm border border-gray-200'>
      {/* 왼쪽: 이미지 카드 */}
      <div className='flex-shrink-0'>
        <ImageCard
          imageSrc={image}
          className='p-0 border-none bg-transparent w-[80px] h-[112px]'
          imageClassName='w-[80px] h-[112px] rounded-md object-cover'
        />
      </div>

      {/* 오른쪽: 평점 + 별점 + 이름 */}
      <div className='ml-3 flex flex-col justify-center'>
        <div className='text-[20px] font-bold leading-none text-gray-800'>{rating.toFixed(1)}</div>
        <div className='flex gap-[2px] mt-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(rating >= i + 1 ? 'fill-purpleDark' : 'fill-gray-300', 'w-3 h-3')}
            />
          ))}
        </div>
        <p className='mt-2 text-xs text-gray-500 leading-snug line-clamp-3'>{name}</p>
      </div>
    </div>
  );
}
