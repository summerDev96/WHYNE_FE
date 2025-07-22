import React from 'react';

import AverageStar from './AverageStar';
import { Button } from '../ui/button';

interface Props {
  rating: number;
  reviewCount: number;
  // ratings: number[];
}

function WineRating({ rating, reviewCount }: Props) {
  return (
    <div
      className='mb-[20px] md:mb-[36px] md:max-w-[587px] xl:max-w-[280px] w-full mx-auto order-1 xl:order-2  
        h-[300px] xl:mx-0'
    >
      <div className='flex justify-between '>
        <div>
          <span className='text-[36px] font-extrabold'>{rating}</span>
          <div className='flex'>
            <AverageStar />
            <span>{reviewCount}</span>
          </div>
        </div>
        <Button variant='purpleDark' size='xs' className='w-fit md:w-fit inline-block px-5 py-2'>
          리뷰 남기기
        </Button>
      </div>

      <div className='flex gap-2 flex-col w-[300px]'></div>
    </div>
  );
}

export default WineRating;
