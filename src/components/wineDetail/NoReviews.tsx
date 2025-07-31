import React from 'react';

import NoReviewIcon from '@/assets/icons/noReview.svg';
import useWineStore from '@/stores/wineStore';

import AddReviewModal from '../Modal/ReviewModal/AddReviewModal';

interface Props {
  className: string;
}

function NoReviews({ className }: Props) {
  const nowWine = useWineStore((state) => state.nowWine);

  if (!nowWine) return <>에러</>;
  const { id, name } = nowWine;

  return (
    <div className={className}>
      <div className='w-[150px] h-[158px] text-gray-400 mx-auto mb-10 md:mb-12 xl:mt-[152px]'>
        <NoReviewIcon />
      </div>
      <div className='w-fit md:w-fit block px-5 py-2 mx-auto  mb-[139px] md:mb-[426px] xl:mb[252px]'>
        <AddReviewModal wineId={id} wineName={name} />
      </div>
    </div>
  );
}

export default NoReviews;
