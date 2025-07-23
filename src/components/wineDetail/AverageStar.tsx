import React from 'react';

import clsx from 'clsx';

import Star from '@/assets/star.svg';

interface Props {
  rating: number;
}

const STARS = ['1st', '2nd', '3rd', '4th', '5th'];

function AverageStar({ rating }: Props) {
  const activateStar = Math.floor(rating);

  return (
    <div className='h-4 md:h-auto w-28'>
      {STARS.map((_, i) => (
        <li
          key={`star${i}`}
          className={clsx({
            'w-[16px] h-[16px] inline-block mr-1': true,
            'text-primary': i < activateStar,
            'text-gray-300': i >= activateStar,
          })}
        >
          <Star />
        </li>
      ))}
    </div>
  );
}

export default AverageStar;
