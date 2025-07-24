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
    <div className='flex flex-col mt-9 space-y-9 md:space-y-16 md:mt-16'>
      {items.map((w) => (
        <ImageCard
          className='relative pl-24 min-h-[164px] md:min-h-[228px] md:pl-44 md:pt-10'
          key={w.id}
          imageSrc={w.image}
          imageClassName='object-contain absolute left-3 bottom-0 h-[185px] md:h-[270px] md:left-12'
          rightSlot={
            <MenuDropdown
              trigger={
                <button className='w-6 h-6 text-gray-500'>
                  <DotIcon />
                </button>
              }
              options={[
                { label: '수정하기', value: 'edit' },
                { label: '삭제하기', value: 'delete' },
              ]}
              onSelect={(value) => {
                console.log(`"${value}" clicked for wine id: ${w.id}`);
              }}
            />
          }
        >
          <div className='flex flex-col items-start justify-center h-full '>
            <h4 className='text-xl/6 font-semibold text-gray-800 mb-4 md:text-3xl md:mb-5'>
              {w.name}
            </h4>
            <p className='custom-text-md-legular text-gray-500 mb-2 md:custom-text-lg-legular md:mb-4'>
              {w.region}
            </p>
            <Badge variant='priceBadge'>₩ {w.price.toLocaleString()}</Badge>
          </div>
        </ImageCard>
      ))}
    </div>
  );
}
