import React from 'react';

import { WineReview } from '@/types/WineTypes';

import NoReviews from './NoReviews';
import WineReviewCard from './WineReviewCard';

interface Props {
  reviews: WineReview[];
  reviewCount: number;
}

function Reviews({ reviews, reviewCount }: Props) {
  return (
    <ul>
      {/* 추후 리뷰 타입 넣기 */}
      {reviewCount > 0 ? (
        reviews.map((review: WineReview) => (
          <li key={review.id} className='mb-[16px] md:mb-[24px] xl:mb-[20px]'>
            <WineReviewCard review={review} />
          </li>
        ))
      ) : (
        <NoReviews className='w-full xl:w-[800px] pt-[80px]' />
      )}
    </ul>
  );
}

export default Reviews;
