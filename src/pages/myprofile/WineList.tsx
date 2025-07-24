import React from 'react';

import DotIcon from '@/assets/icons/dot.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import MenuDropdown from '@/components/common/dropdown/MenuDropdown';
import { Badge } from '@/components/ui/badge';

import { mockUserWinesResponse } from './mockUser';

interface WineListProps {
  items: typeof mockUserWinesResponse.list;
}

export function WineList({ items }: WineListProps) {
  return (
    <div className='flex flex-col space-y-9'>
      {items.map((w) => (
        <ImageCard
          className='relative pl-24 h-[164px]'
          key={w.id}
          imageSrc={w.image}
          imageClassName='object-contain absolute left-3 bottom-0 h-[185px]'
          rightSlot={
            <MenuDropdown
              trigger={
                <button className='w-6 h-6 text-gray-500'>
                  <DotIcon />
                </button>
              }
              options={[
                { label: '수정', value: 'edit' },
                { label: '삭제', value: 'delete' },
              ]}
              onSelect={(value) => {
                console.log(`"${value}" clicked for wine id: ${w.id}`);
              }}
            />
          }
        >
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
