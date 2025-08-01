import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { getRecommendedWines, RecommendedWine } from '@/lib/winelist';

import WineCard from './WineCard';

export default function WineSlider() {
  const [wines, setWines] = useState<RecommendedWine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const data = await getRecommendedWines();
        setWines(data);
        setIsLoading(false);
      } catch (e) {
        setHasError(true);
        setIsLoading(false);
      }
    };
    fetchWines();
  }, []);

  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px] min-w-[365px] mt-[20px] mb-[24px]'>
      <section className='w-full min-h-[241px] rounded-[12px] bg-gray-100 py-[20px] md:min-h-[285px]'>
        <h2 className='pl-[20px] text-gray-800 custom-text-2lg-bold md:custom-text-xl-bold'>
          이번 달 추천 와인
        </h2>

        <div className='relative mt-[20px]'>
          {isLoading ? (
            <p className='text-center'>불러오는 중...</p>
          ) : hasError ? (
            <p className='text-center text-red-500'>추천 와인을 불러올 수 없습니다.</p>
          ) : (
            <Carousel className='w-full'>
              <CarouselContent>
                {wines.map((wine) => (
                  <CarouselItem key={wine.id} className='basis-auto flex items-start '>
                    <WineCard
                      id={wine.id}
                      image={wine.image}
                      name={wine.name}
                      rating={wine.avgRating}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </section>
    </div>
  );
}
