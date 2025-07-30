import React from 'react';

import { GetWineInfoResponse, WineReview } from '@/types/WineTypes';

import NoReviews from './NoReviews';
import WineReviewCard from './WineReviewCard';

// import dynamic from 'next/dynamic';

interface Props {
  reviews: WineReview[];
  reviewCount: number;
  wine: GetWineInfoResponse;
}

// const WineReviewCard = dynamic(() => import('@/components/wineDetail/WineReviewCard'), {
//   ssr: false,
// });
// const NoReviews = dynamic(() => import('@/components/wineDetail/NoReviews'), { ssr: false });

function Reviews({ reviews, reviewCount }: Props) {
  if (reviewCount <= 0) return <NoReviews className='w-full xl:w-[1140px] pt-[80px]' />;
  return (
    <ul>
      {/* 추후 리뷰 타입 넣기 */}
      {reviews.map((review: WineReview) => (
        <li key={review.id} className='mb-[16px] md:mb-[24px] xl:mb-[20px]'>
          <WineReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}

export default Reviews;
