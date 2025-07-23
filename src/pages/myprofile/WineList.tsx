// components/WineList.tsx

import React from 'react';

import DotIcon from '@/assets/icons/dot.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import { Badge } from '@/components/ui/badge';

import type { Wine } from './mockUser';

interface WineListProps {
  items: Wine[];
}

export function WineList({ items }: WineListProps) {
  return (
    <div className='flex flex-col space-y-9'>
      {items.map((w) => (
        <ImageCard
          className='relative pl-24 h-[164px]'
          key={w.id}
          imageSrc='/wine.png'
          imageClassName='object-contain absolute left-3 bottom-0 h-[185px] '
          rightSlot={
            <button className='w-6 h-6 text-gray-500'>
              <DotIcon />
            </button>
          }
        >
          {/* children 으로 name, region, price 렌더 */}
          <div className='flex flex-col items-start'>
            <h4 className='font-semibold text-gray-900 mb-5'>{w.name}</h4>
            <p className='text-sm text-gray-500 mb-4'>{w.region}</p>
            <Badge variant='priceBadge'>₩ {w.price.toLocaleString()}</Badge>
          </div>
        </ImageCard>
      ))}
    </div>
  );
}
