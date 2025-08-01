import { useQuery } from '@tanstack/react-query';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { getRecommendedWines } from '@/lib/wineApi';
import { RecommendedWineResponse } from '@/types/wineListType';

import WineCard from './WineCard';

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM;
const RECOMMENDED_WINES_LIMIT = 4;

export default function WineSlider() {
  const { data, isLoading, isError } = useQuery<RecommendedWineResponse>({
    queryKey: ['recommendedWines'],
    queryFn: () => getRecommendedWines({ teamId: TEAM_ID!, limit: RECOMMENDED_WINES_LIMIT }),
  });

  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px] min-w-[365px] mt-[20px] mb-[24px]'>
      <section className='w-full min-h-[241px] rounded-[12px] bg-gray-100 py-[20px] md:min-h-[285px]'>
        <h2 className='pl-[20px] text-gray-800 custom-text-2lg-bold md:custom-text-xl-bold'>
          이번 달 추천 와인
        </h2>

        <div className='relative mt-[20px]'>
          {isLoading && !data ? (
            <p className='text-center'>불러오는 중...</p>
          ) : isError || !data ? (
            <p className='text-center text-red-500'>추천 와인을 불러올 수 없습니다.</p>
          ) : (
            (() => {
              const filteredWines = data.filter((wine) => !wine.image.includes('example.com'));
              if (filteredWines.length === 0) {
                return <p className='text-center'>추천 와인 목록이 없습니다.</p>;
              }

              return (
                <Carousel className='w-full'>
                  <CarouselContent>
                    {filteredWines.map((wine) => (
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
              );
            })()
          )}
        </div>
      </section>
    </div>
  );
}
