import React from 'react';

import AverageStar from './AverageStar';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface Props {
  rating: number;
  reviewCount: number;
  ratings: number[];
}

function WineRating({ rating, reviewCount, ratings }: Props) {
  return (
    <div
      className='mb-[20px] md:mb-[36px] md:px-[63px] xl:px-0 w-full xl:max-w-[280px] mx-auto order-1 xl:order-2  
      xl:mx-0'
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

      <div className='flex gap-2 flex-col w-full  '>
        {ratings.map((rating, i) => (
          <div key={`${5 - i}points`} className='flex items-center justify-between '>
            <span className='block w-8 text-gray-500 mr-4'>{5 - i}점</span>
            <Progress className='h-[6px]' value={rating} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WineRating;
