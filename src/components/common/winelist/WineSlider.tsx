import { useEffect, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getWineInfoForClient } from '@/api/getWineInfo';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { getRecommendedWines } from '@/lib/wineApi';
import { RecommendedWineResponse } from '@/types/wineListType';

import WineCard from './WineCard';

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM;
const RECOMMENDED_WINES_LIMIT = 30;

export default function WineSlider() {
  const { data, isLoading, isError } = useQuery<RecommendedWineResponse>({
    queryKey: ['recommendedWines'],
    queryFn: () => getRecommendedWines({ teamId: TEAM_ID!, limit: RECOMMENDED_WINES_LIMIT }),
  });

  const queryClient = useQueryClient();

  const prefetchWineInfo = async (wineid: number) => {
    await queryClient.prefetchQuery({
      queryKey: ['wineDetail', wineid],
      queryFn: () => getWineInfoForClient(wineid),
      staleTime: 1000 * 60 * 5,
    });
  };

  useEffect(() => {
    data?.forEach((wine) => {
      prefetchWineInfo(wine.id);
    });
  }, [data]);

  // useState 훅들을 여기에 선언합니다.
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // setApi prop에 직접 콜백을 작성하는 대신,
  // api 상태가 변경될 때마다 캐러셀 이벤트를 관리하는 useEffect 훅을 사용합니다.
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setIsAtStart(!api.canScrollPrev());
      setIsAtEnd(!api.canScrollNext());
    };

    // 초기 렌더링 시에도 상태를 업데이트합니다.
    handleSelect();

    api.on('select', handleSelect);
    api.on('reInit', handleSelect);

    return () => {
      api.off('select', handleSelect);
      api.off('reInit', handleSelect);
    };
  }, [api]);

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
                <Carousel
                  opts={{
                    align: 'start',
                    slidesToScroll: 2,
                  }}
                  setApi={setApi} // <-- useState로 선언한 setApi 함수를 prop으로 전달합니다.
                >
                  <CarouselContent>
                    {filteredWines.map((wine, index) => (
                      <CarouselItem key={wine.id} className='basis-auto flex items-start '>
                        <WineCard
                          id={wine.id}
                          image={wine.image}
                          name={wine.name}
                          rating={wine.avgRating}
                          isCarouselEnd={isAtEnd && index >= filteredWines.length - 2}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious disabled={isAtStart} className='z-50' />
                  <CarouselNext disabled={isAtEnd} className='z-50' />
                </Carousel>
              );
            })()
          )}
        </div>
      </section>
    </div>
  );
}
