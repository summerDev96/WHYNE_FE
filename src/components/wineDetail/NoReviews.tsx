import React from 'react';

import NoReviewIcon from '@/assets/icons/noReview.svg';

import { Button } from '../ui/button';

interface Props {
  className: string;
}

function NoReviews({ className }: Props) {
  return (
    <div className={className}>
      <div className='w-[150px] h-[158px] text-gray-400 mx-auto mb-10 md:mb-12 xl:mt-[152px]'>
        <NoReviewIcon />
      </div>
      <Button
        variant='purpleDark'
        size='xs'
        className='w-fit md:w-fit block px-5 py-2 mx-auto  mb-[139px] md:mb-[426px] xl:mb[252px]'
      >
        리뷰 남기기
      </Button>
    </div>
  );
}

export default NoReviews;
