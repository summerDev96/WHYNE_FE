import React from 'react';

import { motion } from 'framer-motion';

import { Progress } from '@/components/ui/progress';
import useWineStore from '@/stores/wineStore';

import AverageStar from './AverageStar';
import AddReviewModal from '../Modal/ReviewModal/AddReviewModal';

interface Props {
  rating: number;
  reviewCount: number;
  ratings: number[];
}

function WineRating({ rating, reviewCount, ratings }: Props) {
  const nowWine = useWineStore((state) => state.nowWine);

  if (!nowWine) return;
  const { id, name } = nowWine;

  const percentageArr = ratings.map((rating) => {
    return (rating / reviewCount) * 100;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      className='mb-10 md:mb-[60px] md:px-[63px] xl:px-0 w-full xl:max-w-[280px] mx-auto xl:mx-0 order-1 xl:order-2  
      flex flex-col md:flex-row md:gap-20 xl:gap-0 xl:flex-col xl:relative'
    >
      {reviewCount > 0 && (
        <>
          <div className='flex justify-between order-1 md:flex-col xl:mb-5'>
            <div className='flex items-center md:mb-[30px] xl:mb-0'>
              <span className='text-[36px] md:text-[54px] font-extrabold mr-4 md:mr-5'>
                {rating.toFixed(1)}
              </span>
              <div>
                <AverageStar rating={rating} />
                <div className='custom-text-md-regular text-gray-500'>{reviewCount}개의 후기</div>
              </div>
            </div>
            <div className='w-fit md:w-fit inline-block  xl:absolute xl:left-0 xl:top-[270px]'>
              <AddReviewModal wineId={id} wineName={name} />
            </div>
          </div>
          <div className='flex gap-2 flex-col w-full order-2 '>
            {percentageArr.reverse().map((rating, i) => (
              <div key={`${5 - i}points`} className='flex items-center justify-between'>
                <span className='block w-8 text-gray-500 mr-4'>{5 - i}점</span>
                <Progress className='h-[6px]' value={rating} />
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default WineRating;
