import React from 'react';

import FaStar from '@/assets/ratingstar.svg';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => {
  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: 5 }, (_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            type='button'
            onClick={() => onChange(ratingValue)}
            className='focus:outline-none'
          >
            <FaStar
              className={`w-[16px] md:w-[22px] h-[16px] md:h-[22px] ${ratingValue <= value ? 'text-primary' : 'text-gray-300'}`}
            />
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
