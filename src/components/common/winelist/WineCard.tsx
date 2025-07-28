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
    <div className='flex w-[193px] h-[160px] md:w-[160px] bg-white p-2 rounded-lg shadow-sm border border-gray-200'>
      {/* 왼쪽: 이미지 카드 */}
      <div className='flex-shrink-0'>
        <ImageCard
          imageSrc={image}
          className='p-0 border-none bg-transparent w-[80px] h-[112px]'
          imageClassName='w-[38px] h-[136px] ml-[10px] rounded-md object-cover mt-[14px]'
        />
      </div>

      {/* 오른쪽: 평점 + 별점 + 이름 */}
      <div className='w-[80px] h-[97px] flex flex-col justify-start mt-[10px] ml-[5px]'>
        <div className='text-[28px] font-extrabold leading-100% text-gray-800'>
          {rating.toFixed(1)}
        </div>
        <div className='flex gap-[2px] w-[60px] h-[12px] -mt-[2px]'>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                rating >= i + 1 ? 'fill-purpleDark' : 'fill-gray-300',
                'w-[12px] h-[12px]',
              )}
            />
          ))}
        </div>
        <p className='text-[10px] leading-[140%] text-gray-500 line-clamp-7 mt-[10px]'>{name}</p>
      </div>
    </div>
  );
}
