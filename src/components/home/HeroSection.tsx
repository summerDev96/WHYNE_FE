import Image from 'next/image';

import { ImageCard } from '../common/card/ImageCard';

export const HeroSection = () => {
  return (
    <header>
      <div className='relative h-[403px] md:h-[394px] xl:h-[535px] bg-[#171A21] flex items-center justify-center overflow-hidden rounded-lg'>
        <div className='flex flex-col items-center h-full'>
          <div>
            <Image
              src='/assets/lendinglogo.png'
              alt='와인 로고 이미지'
              width={100}
              height={100}
              className='w-[81px] md:w-[100px] h-[23px] md:h-[30px] text-primary mt-[58px] md:mt-[80px] xl:mt-[112px]'
            />
          </div>
          <span className='text-white text-center custom-text-xl-bold md:custom-text-2xl-bold mt-6 md:mt-8'>
            한 곳에서 관리하는 <br />
            나만의 와인창고
          </span>
          <div className='relative w-[720px] h-[420px] mt-auto mx-auto translate-y-[80px] md:translate-y-[40px] xl:translate-y-[120px] scale-[1] md:scale-[0.7] xl:scale-[1]'>
            {/* 기준 박스 translate-y 아래로-ㅁㅁ만큼 밀어내기 */}
            <div className='absolute top-4 left-1/2 w-[240px] h-[188px] bg-white rounded-xl z-30 -translate-x-1/2 shadow-xl'>
              <ImageCard
                imageSrc='/assets/lendingwine3.png'
                imageClassName='h-full w-[44px] object-contain '
              >
                <div className='flex flex-col ml-[8px] w-[100px]'>
                  <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                  {/* 모달쪽에 구현해둔 별점이 있음 */}
                  <span>별점 나중에</span>
                  <p className='custom-text-xs-regular text-gray-500'>
                    Sentinel Carbernet Sauvignon 2016
                  </p>
                </div>
              </ImageCard>
            </div>

            {/* 좌우 위 박스 */}
            <div className='absolute top-10 left-[calc(50%-340px)] w-[240px] h-[185px] rounded-xl z-20 shadow-xl'>
              <ImageCard
                imageSrc='/assets/lendingwine1.png'
                imageClassName='h-full w-[44px] object-contain '
              >
                <div className='flex flex-col ml-[8px] w-[100px]'>
                  <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                  <span>별점 나중에</span>
                  <p className='custom-text-xs-regular text-gray-500'>
                    Sentinel Carbernet Sauvignon 2016
                  </p>
                </div>
              </ImageCard>
            </div>
            <div className='absolute top-10 left-[calc(50%+100px)] w-[240px] h-[185px] rounded-xl z-20 shadow-xl'>
              <ImageCard
                imageSrc='/assets/lendingwine1.png'
                imageClassName='h-full w-[44px] object-contain '
              >
                <div className='flex flex-col ml-[8px] w-[100px]'>
                  <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                  <span>별점 나중에</span>
                  <p className='custom-text-xs-regular text-gray-500'>
                    Sentinel Carbernet Sauvignon 2016
                  </p>
                </div>
              </ImageCard>
            </div>

            {/* 좌우 아래 박스 */}
            <div className='absolute top-[80px] left-[calc(50%-480px)] w-[240px] h-[185px] bg-primary rounded-xl z-10 shadow-xl'>
              <ImageCard
                imageSrc='/assets/lendingwine1.png'
                imageClassName='h-full w-[44px] object-contain '
              >
                <div className='flex flex-col ml-[8px] w-[100px]'>
                  <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                  <span>별점 나중에</span>
                  <p className='custom-text-xs-regular text-gray-500'>
                    Sentinel Carbernet Sauvignon 2016
                  </p>
                </div>
              </ImageCard>
            </div>
            <div className='absolute top-[80px] left-[calc(50%+240px)] w-[240px] h-[185px] bg-[#6A42DB] rounded-xl z-10 shadow-xl'>
              <ImageCard
                imageSrc='/assets/lendingwine1.png'
                imageClassName='h-full w-[44px] object-contain '
              >
                <div className='flex flex-col ml-[8px] w-[100px]'>
                  <span className='font-extrabold text-4xl text-gray-800'>4.3</span>
                  <span>별점 나중에</span>
                  <p className='custom-text-xs-regular text-gray-500'>
                    Sentinel Carbernet Sauvignon 2016
                  </p>
                </div>
              </ImageCard>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
