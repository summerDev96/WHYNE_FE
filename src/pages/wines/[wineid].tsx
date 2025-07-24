import React from 'react';

import Star from '@/assets/icons/star.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import { ReviewCard } from '@/components/common/card/ReviewCard';
import UserDefaultImg from '@/components/common/UserDefaultImg';
import FlavorSliderList from '@/components/wineDetail/FlavorSliderList';
import Kebab from '@/components/wineDetail/Kebab';
import LikeButton from '@/components/wineDetail/LikeButton';
import { testReviews, wineInfo } from '@/components/wineDetail/mock';
import WineContent from '@/components/wineDetail/WineContent';
import WineRating from '@/components/wineDetail/WineRating';

export default function WineInfoById() {
  const { name, region, price, image } = wineInfo;

  return (
    <main className='mx-auto px-4 md:px-5 xl:px-0 max-w-[1140px]  min-w-[343px]'>
      <ImageCard
        imageSrc={image}
        imageClassName={IMAGE_CLASS_NAME}
        className='mx-auto relative w-full h-[190px] md:h-[260px] border rounded-[16px] mt-[29px] md:mt-[62px] mb-[40px] md:mb-[60px]'
      >
        <WineContent name={name} region={region} price={price} />
      </ImageCard>
      <div className='flex flex-col xl:flex-row max-w-[1140px] w-full mx-auto justify-between '>
        <div className='flex-col  order-2 xl:order-1 xl:max-w-[1140px] '>
          <h2 className='hidden xl:block mb-[22px] xl:custom-text-xl-bold'>리뷰 목록</h2>
          <ul>
            {testReviews.map((review) => (
              <li key={review.id} className='mb-[16px] md:mb-[24px] xl:mb-[20px]'>
                <ReviewCard
                  userIcon={<UserDefaultImg className='size-10 md:size-16' />}
                  menuSlot={<Kebab />}
                  likeSlot={<LikeButton isLike={false} />}
                  tags={review.aroma}
                  timeAgo={review.updatedAt}
                  username={review.user.name}
                  rating={
                    <span className='inline-flex gap-1 items-center'>
                      <Star className='size-3 md:size-4 md:mt-[-2px]' /> {review.rating}
                    </span>
                  }
                  reviewText={review.content}
                  flavorSliderSlot={
                    <FlavorSliderList
                      lightBold={review.lightBold}
                      smoothTannic={review.smoothTannic}
                      drySweet={review.drySweet}
                      softAcidic={review.softAcidic}
                    />
                  }
                  className='w-full xl:w-[800px]'
                ></ReviewCard>
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
