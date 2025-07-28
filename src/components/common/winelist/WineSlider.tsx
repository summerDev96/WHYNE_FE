import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

import WineCard from './WineCard';

// Mock 데이터 4개 x 5세트 = 20개
const baseWines = [
  {
    id: 1,
    name: 'Sentinel Carbernet Sauvignon 2016',
    image: '/images/image1.svg',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Palazzo della Torre 2017',
    image: '/images/image3.svg',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Sentinel Carbernet Sauvignon 2016',
    image: '/images/image2.svg',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Palazzo della Torre 2017',
    image: '/images/image4.svg',
    rating: 3.1,
  },
];

// 총 20개로 확장 (4개 반복)
const mockWines = Array.from({ length: 20 }).map((_, i) => {
  const wine = baseWines[i % baseWines.length];
  return {
    ...wine,
    id: i + 1,
  };
});

export default function WineSlider() {
  return (
    <div className='px-[16px] mt-[85px] mb-[24px] w-full mx-auto md:px-[20px] md:mt-[20px] md:mb-[40px] xl:px-0 xl:mt-[10px] xl:mb-[40px]'>
      <section className='w-full h-[241px] rounded-[12px] bg-gray-100 md:h-[299px] md:rounded-[16px] xl:h-[299px] xl:rounded-[16px]'>
        <h2 className='py-[20px] pl-[20px] text-gray-800 custom-text-2lg-bold md:py-[30px] md:pl-[30px] md:custom-text-xl-bold xl:py-[30px] xl:pl-[30px] xl:leading-[40px]'>
          이번 달 추천 와인
        </h2>

        {/* 캐러셀 영역 */}
        <div className='relative mt-[20px] md:mt-[30px] xl:mt-[30px]'>
          <Carousel className='w-full'>
            <CarouselContent>
              {mockWines.map((wine) => (
                <CarouselItem key={wine.id} className='basis-auto flex items-start '>
                  <WineCard {...wine} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
