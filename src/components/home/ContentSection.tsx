import Image from 'next/image';

import { ImageCard } from '../common/card/ImageCard';

export const ContentSection = () => {
  return (
    <div className='mx-auto md:px-[32px] xl:px-0 max-w-[640px]  min-w-[343px] mt-12 md:mt-[80px] xl:mt-[160px]'>
      <div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[48px] md:mb-[96px] rounded-2xl'>
        <div className='absolute top-[24px] md:top-[56px] left-[24px] md:left-[32px]'>
          <span className='custom-text-2lg-bold md:custom-text-xl-bold'>
            매달 새롭게 만나는 <br />
            와인 추천 콘탠츠
          </span>
          <p className='custom-text-xs-regular text-gray-500'>매달 다양한 인기 와인을 만나보세요</p>
        </div>
        <div className='absolute w-[290px] md:w-[356px] h-[241px] md:h-[277px] right-0 bottom-[24px] md:bottom-0 bg-gray-100 overflow-hidden'>
          <span className='absolute text-[#7E7E7E] md:text-[#50545B] custom-text-lg-bold md:custom-text-2lg-bold left-5 top-5'>
            이번 달 추천 와인
          </span>
          <div className='flex gap-2.5 ml-5 mt-[61px] '>
            <div className='w-[193px] flex-shrink-0'>
              <ImageCard
                className='bg-white h-[160px] rounded-lg border-none overflow-hidden'
                imageSrc='/assets/lendingwine3.png'
                imageClassName='h-[165px] w-[44px] object-contain '
              >
                <div className='flex flex-col ml-[9px] w-[80px]'>
                  <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                  <span>별점 나중에</span>
                  <p className='text-[10px] text-gray-500'>Sentinel Carbernet Sauvignon 2016</p>
                </div>
              </ImageCard>
            </div>
            <div className='w-[193px] flex-shrink-0'>
              <ImageCard
                className='bg-white h-[160px] rounded-lg border-none overflow-hidden'
                imageSrc='/assets/lendingwine3.png'
                imageClassName='h-[165px] w-[44px] object-contain '
              >
                <div className='flex flex-col ml-[9px] w-[80px]'>
                  <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                  <span>별점 나중에</span>
                  <p className='text-[10px] text-gray-500'>Sentinel Carbernet Sauvignon 2016</p>
                </div>
              </ImageCard>
            </div>
          </div>
        </div>
      </div>
      <div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[48px] md:mb-[96px] rounded-2xl overflow-hidden'>
        <div className='absolute top-[24px] md:top-[55px] left-[24px] md:left-[32px]'>
          <span className='custom-text-2lg-bold md:custom-text-xl-bold'>
            다양한 필터로 찾는
            <br />내 맞춤 와인
          </span>
          <p className='custom-text-xs-regular text-gray-500'>
            와인 타입, 가격, 평점으로 <br />
            나에게 맞는 와인을 쉽게 검색해요.
          </p>
        </div>
        <Image
          width={280}
          height={100}
          alt='필터로 찾은 내 맞춤 와인'
          src='/assets/lendingwinecard.png'
          className='absolute right-[-10px] top-[110px] md:top-[65px]'
        />
        <div
          className='pointer-events-none absolute inset-0 rounded-xl'
          style={{
            background:
              'linear-gradient(to top, #EBEEF4 0%, transparent 5%, transparent 95%, #EBEEF4 100%)',
          }}
        />
      </div>
      <div className='relative bg-[#EBEEF4] h-[424px] md:h-[320px] mb-[64px] md:mb-[80px] xl:mb-[104px] rounded-2xl overflow-hidden  '>
        <div className='absolute top-[24px] md:top-[55px] left-[24px] md:left-[28px]'>
          <span className='custom-text-2lg-bold md:custom-text-xl-bold'>
            직관적인
            <br />
            리뷰 시스템
          </span>
          <p className='custom-text-xs-regular text-gray-500'>
            더 구체화된 리뷰 시스템으로
            <br />
            쉽고 빠르게 와인 리뷰를 살펴보세요/
          </p>
        </div>
        <Image
          width={272}
          height={100}
          alt='와인 리뷰 예시 이미지'
          src='/assets/lendingreviewcard.png'
          className='absolute right-[-10px] top-[120px] md:right-[42px] md:top-[-65px]'
        />
        <div
          className='pointer-events-none absolute inset-0 rounded-xl'
          style={{
            background:
              'linear-gradient(to top, #EBEEF4 0%, transparent 5%, transparent 95%, #EBEEF4 100%)',
          }}
        />
      </div>
    </div>
  );
};
