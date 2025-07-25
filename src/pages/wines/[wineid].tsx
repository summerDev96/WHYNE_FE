import React from 'react';

import { ImageCard } from '@/components/common/card/ImageCard';
import { testReviews, wineInfo } from '@/components/wineDetail/mock';
import WineContent from '@/components/wineDetail/WineContent';
import WineRating from '@/components/wineDetail/WineRating';
import WineReviewCard from '@/components/wineDetail/WineReviewCard';
import { cn } from '@/lib/utils';

export default function WineInfoById() {
  const { name, region, price, image } = wineInfo;

  return (
    <main className='mx-auto px-4 md:px-5 xl:px-0 max-w-[1140px]  min-w-[343px]'>
      <ImageCard
        imageSrc={image}
        imageClassName={IMAGE_CLASS_NAME}
        className={cn(
          'mx-auto relative w-full h-[190px] md:h-[260px]  rounded-[16px] mt-[29px] md:mt-[62px] mb-[40px] md:mb-[60px] border-0',
          'bg-gradient-to-tr from-white from-50% to-primary/20 to-100%', //그래디언트 설정 추후 변경
          'shadow-sm',
        )}
      >
        <WineContent name={name} region={region} price={price} />
      </ImageCard>
      <div className='flex flex-col xl:flex-row max-w-[1140px] w-full mx-auto justify-between '>
        <div className='flex-col  order-2 xl:order-1 xl:max-w-[1140px] '>
          <h2 className='sr-only xl:not-sr-only !mb-[22px] xl:custom-text-xl-bold'>리뷰 목록</h2>
          <ul>
            {testReviews.map((review) => (
              <li key={review.id} className='mb-[16px] md:mb-[24px] xl:mb-[20px]'>
                <WineReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
        <WineRating rating={4.8} reviewCount={47} ratings={[90, 80, 50, 30, 20]}></WineRating>
      </div>
    </main>
  );
}

const IMAGE_CLASS_NAME =
  'w-[58px] md:w-[84px] xl:w-[58px] h-[209px] md:h-[302px] xl:h-[209px] absolute bottom-0 left-[20px] md:left-[60px] xl:left-[100px]';
