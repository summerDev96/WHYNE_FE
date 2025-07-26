import Link from 'next/link';

import NextIcon from '@/assets/icons/Next.svg';
import StarIcon from '@/assets/icons/Star.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import { Button } from '@/components/ui/button';

const mockWines = [
  {
    id: 1,
    name: 'Sentinel Carbernet Sauvignon 2016',
    region: 'Western Cape, South Africa',
    image: '/images/image1.svg',
    price: 64900,
    rating: 4.8,
    review:
      'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
  },
  {
    id: 2,
    name: 'Palazzo della Torre 2017',
    region: 'Western Cape, South Africa',
    image: '/images/image3.svg',
    price: 64900,
    rating: 4.6,
    review:
      'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
  },
  {
    id: 3,
    name: 'Sentinel Carbernet Sauvignon 2016',
    region: 'Western Cape, South Africa',
    image: '/images/image2.svg',
    price: 59900,
    rating: 4.6,
    review:
      'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
  },
  {
    id: 4,
    name: 'Palazzo della Torre 2017',
    region: 'Western Cape, South Africa',
    image: '/images/image4.svg',
    price: 74000,
    rating: 3.1,
    review:
      'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
  },
];

export default function WineListCard() {
  return (
    <div className='gap-[24px] mt-[12px] max-w-[1140px] mx-auto'>
      {mockWines.map((wine) => (
        <Link href={`/wines/${wine.id}`} passHref legacyBehavior key={wine.id}>
          <a className='block no-underline'>
            <div className='w-full rounded-[12px] border border-gray-300 bg-white flex flex-col mb-[32px] xl:w-[800px] xl:rounded-[16px] xl:mb-[50px]'>
              <ImageCard
                imageSrc={wine.image}
                className='relative border-none px-[16px] pt-[20px] pb-0 xl:px-[60px] xl:pt-[40px]'
                imageClassName='w-[60px] h-[208px]'
              >
                <div className='flex flex-col gap-[16px] pr-0 ml-[16px] w-full xl:pr-[30px] xl:ml-[70px] xl:w-[549px]'>
                  <div className='flex flex-col gap-[8px] xl:flex-row xl:justify-between xl:gap-[50px]'>
                    {/* 좌측 name/region */}
                    <div className='flex flex-col justify-start'>
                      <div className='text-[18px] font-semibold text-gray-800 mb-[4px] relative -top-[7px] xl:custom-text-3xl-semibold xl:mb-[8px]'>
                        {wine.name}
                      </div>
                      <div className='text-[14px] text-gray-500 relative top-[10px] xl:custom-text-lg-regular'>
                        {wine.region}
                      </div>
                    </div>

                    {/* 우측 rating */}
                    <div className='flex flex-row items-center gap-[8px] pt-[8px] xl:flex-col xl:items-start xl:justify-start xl:pl-[30px] xl:pt-[20px]'>
                      <div className='text-[28px] font-bold relative -top-[4px] xl:text-[50px] xl:font-black'>
                        {wine.rating.toFixed(1)}
                      </div>
                      <div className='flex flex-col gap-[4px] mt-[22px]'>
                        <div className='flex gap-[4px]'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className={
                                wine.rating >= i + 1
                                  ? 'w-4 h-4 fill-primary'
                                  : 'w-4 h-4 fill-gray-300'
                              }
                              style={{ width: '20px', height: '20px' }}
                            />
                          ))}
                        </div>
                        <div className='text-[14px] text-gray-500 text-nowrap xl:mt-[12px]'>
                          47개의 후기
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 가격 + 버튼 */}
                  <div className='flex justify-between items-center w-full'>
                    <Button
                      variant='purpleLight'
                      size='xs'
                      width='sm'
                      fontSize={null}
                      className='text-[16px] text-primary mt-[4px] xl:custom-text-2lg-bold xl:mt-[7px]'
                    >
                      ₩ {wine.price.toLocaleString()}
                    </Button>
                    {/* ✅ NextIcon → 버튼화 + hover 스타일 */}
                    <button type='button' className='group p-[4px] rounded-[4px]'>
                      <NextIcon className='w-[24px] h-[24px] text-gray-300 group-hover:text-gray-500 xl:w-[30px] xl:h-[30px]' />
                    </button>
                  </div>
                </div>
              </ImageCard>

              {/* 구분선 + 후기 */}
              <div className='w-full h-[1px] bg-gray-300' />
              <div className='px-[16px] py-[20px] xl:px-[60px] xl:py-[20px]'>
                <div className='text-[14px] font-semibold text-gray-800 mb-[4px] xl:text-[16px]'>
                  최신 후기
                </div>
                <div className='text-[14px] font-normal text-gray-500 leading-[24px] xl:text-[16px] xl:leading-[26px]'>
                  {wine.review}
                </div>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
