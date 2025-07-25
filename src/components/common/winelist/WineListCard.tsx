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
        <div
          key={wine.id}
          className='w-[800px] rounded-[16px] border border-gray-300 bg-white flex flex-col mb-[50px]'
        >
          <ImageCard
            imageSrc={wine.image}
            className='relative border-none px-[60px] pt-[40px] pb-0'
            imageClassName='w-[60px] h-[208px]'
          >
            {/* ✅ 세로 정렬 안에 가로 정렬 2개 (name+region) (rating+stars) */}
            <div className='flex flex-col gap-[16px] pr-[30px] ml-[70px] w-[549px]'>
              {/* 상단 : name/region + rating/stars */}
              <div className='flex justify-between gap-[50px]'>
                {/* 좌측 name + region */}
                <div className='flex flex-col justify-start'>
                  <div className='custom-text-3xl-semibold text-gray-800 mb-[8px]'>{wine.name}</div>
                  <div className='custom-text-lg-regular text-gray-500'>{wine.region}</div>
                </div>

                {/* 우측 rating + 별점 */}
                <div className='flex flex-col items-start justify-start gap-[35px] pl-[30px] pt-[20px]'>
                  <div className=' text-[50px] font-black'>{wine.rating.toFixed(1)}</div>
                  <div className='flex '>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={
                          wine.rating >= i + 1 ? 'w-4 h-4 fill-primary' : 'w-4 h-4 fill-gray-300'
                        }
                        style={{ width: '24px', height: '24px' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 하단 : price + next */}
              <div className='flex justify-between items-center w-full'>
                <Button
                  variant='purpleLight' // 버튼 스타일: 흰 배경 + 테두리
                  size='xs'
                  width='sm'
                  fontSize={null}
                  className='custom-text-2lg-bold text-primary mt-[7px]' // ✅ 컬러 유지 + 위쪽 여백
                >
                  ₩ {wine.price.toLocaleString()}
                </Button>
                <NextIcon className='w-[30px] h-[30px] text-gray-300' />
              </div>
            </div>
          </ImageCard>

          <div className='w-full h-[1px] bg-gray-300' />
          <div className='px-[60px] py-[20px]'>
            <div className='text-[16px] font-semibold text-gray-800 mb-[4px]'>최신 후기</div>
            <div className='text-[16px] font-normal text-gray-500 leading-[26px]'>
              {wine.review}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
