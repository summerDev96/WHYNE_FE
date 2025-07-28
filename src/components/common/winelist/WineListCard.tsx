import Link from 'next/link';

import NextIcon from '@/assets/icons/Next.svg';
import StarIcon from '@/assets/icons/Star.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className='flex flex-col gap-[24px] px-[16px] mt-[12px] min-w-[370px] xl:max-w-[800px] md:mx-auto md:px-0'>
      {mockWines.map((wine) => (
        <Link href={`/wines/${wine.id}`} key={wine.id} className='no-underline'>
          {/* 카드 컨테이너 */}
          <div className='w-full bg-white border border-gray-300 rounded-xl flex flex-col relative'>
            <ImageCard
              imageSrc={wine.image}
              imageClassName='w-[60px] h-[208px] mt-[30px] block object-contain max-w-full max-h-full max-[342px]:w-full max-[342px]:h-auto'
              className='pt-[20px] pb-0 border-none md:pl-[30px]'
              rightSlot={null}
            >
              {/* ImageCard children 영역 (모바일 요소 포함) */}
              <div className='flex flex-col w-full px-[16px] md:px-0'>
                {/* name, region, price 버튼 */}
                <div
                  className='flex flex-col w-full ml-0 mt-[20px] gap-[8px]
                             md:w-[300px] md:ml-[36px] md:gap-[10px]'
                >
                  <div
                    className='custom-text-xl-semibold text-gray-800 leading-[32px] h-auto
                               break-words max-w-[220px] mt-[5px] md:custom-text-3xl-semibold md:max-w-none'
                  >
                    {wine.name}
                  </div>
                  <div
                    className='custom-text-md-regular text-gray-500 leading-[24px] h-[24px]
                               md:text-[16px] md:leading-[26px] md:h-[26px] break-words'
                  >
                    {wine.region}
                  </div>
                  <Button
                    variant='purpleLight'
                    className='
    text-[14px] text-purpleDark font-bold leading-[24px] 
    px-[10px] py-[4px] rounded-[10px] h-auto

    w-full max-w-[86px] md:max-w-none

    md:text-[18px] md:leading-[26px] 
    md:px-[15px] md:py-[8px] 
    md:rounded-[12px] 
    md:w-[110px] md:h-[42px] md:mt-[12px]'
                  >
                    ₩ {wine.price.toLocaleString()}
                  </Button>
                </div>

                {/* 모바일용 rating */}
                <div
                  className='flex flex-row items-start mt-[23px] w-full ml-0 gap-[6px]
                             md:hidden'
                >
                  <div className='text-[28px] font-extrabold text-gray-800 w-auto h-auto'>
                    {wine.rating.toFixed(1)}
                  </div>
                  <div className='flex flex-col gap-[5px] ml-[15px] w-[100px] h-auto mt-[-6px]'>
                    <div className='flex gap-[4px] flex-nowrap'>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={cn(
                            wine.rating >= i + 1 ? 'fill-purpleDark' : 'fill-gray-300',
                            'w-3 h-3',
                          )}
                        />
                      ))}
                    </div>
                    <div className='custom-text-xs-regular text-gray-500 break-words'>
                      47개의 후기
                    </div>
                  </div>
                </div>

                {/* 모바일용 NextIcon */}
                <div className='flex-grow md:hidden flex justify-end items-center px-[16px] pr-[10px] mt-[-35px]'>
                  <button type='button' className='w-[36px] h-[36px] p-[4px] rounded'>
                    <NextIcon className='w-full h-full text-gray-300 hover:text-gray-500' />
                  </button>
                </div>
              </div>
            </ImageCard>

            {/* 태블릿/PC용 rating */}
            <div className='hidden md:flex flex-col items-start absolute top-[40px] right-[-10px] z-10'>
              <div className='text-[48px] font-extrabold text-gray-800 leading-[48px] md:mt-[9px]'>
                {wine.rating.toFixed(1)}
              </div>
              <div className='flex flex-col gap-[5px] w-[160px] mt-[15px] items-start'>
                <div className='flex gap-[4px] flex-nowrap'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        wine.rating >= i + 1 ? 'fill-purpleDark' : 'fill-gray-300',
                        'w-[16px] h-[16px]',
                      )}
                    />
                  ))}
                </div>
                <div className='custom-text-sm-regular text-gray-500 break-words w-[100px] text-left mt-[7px]'>
                  47개의 후기
                </div>
              </div>
            </div>

            {/* 태블릿/PC용 NextIcon */}
            <button
              type='button'
              className='w-[40px] h-[40px] p-[4px] rounded flex-shrink-0 ml-0 hidden md:block absolute top-[185px] right-[50px] z-20'
            >
              <NextIcon className='w-full h-full text-gray-300 hover:text-gray-500' />
            </button>

            {/* 구분선 */}
            <div className='w-full h-px bg-gray-300 mt-[-1px]' />

            {/* 후기 영역 */}
            <div className='px-[16px] py-[20px]'>
              <div className='text-[14px] font-semibold text-gray-800 mb-[4px] break-words'>
                최신 후기
              </div>
              <div className='text-[14px] text-gray-500 leading-[24px] break-words'>
                {wine.review}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
