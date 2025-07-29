import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

import WineCard from './WineCard';

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

const mockWines = Array.from({ length: 20 }).map((_, i) => {
  const wine = baseWines[i % baseWines.length];
  return {
    ...wine,
    id: i + 1,
  };
});

export default function WineSlider() {
  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px] min-w-[365px] mt-[20px] mb-[24px]'>
      <section className='w-full min-h-[241px] rounded-[12px] bg-gray-100 py-[20px] md:min-h-[285px]'>
        <h2 className='pl-[20px] text-gray-800 custom-text-2lg-bold md:custom-text-xl-bold'>
          이번 달 추천 와인
        </h2>

        {/* 캐러셀 영역 */}
        <div className='relative mt-[20px]'>
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
