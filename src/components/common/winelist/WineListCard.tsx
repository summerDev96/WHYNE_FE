import { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { getWineInfoForClient } from '@/api/getWineInfo';
import NextIcon from '@/assets/icons/Next.svg';
import StarIcon from '@/assets/icons/star.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import { Button } from '@/components/ui/button';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useWineListQuery } from '@/hooks/useWineListQuery';
import { cn } from '@/lib/utils';
import { GetWinesResponse } from '@/types/wineListType';

export default function WineListCard() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useWineListQuery();

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    hasNextPage,
    fetchNextPage,
    isFetching: isFetchingNextPage,
    threshold: 0.3,
  });

  const wineList = data?.pages.flatMap(
    (page) =>
      (page as GetWinesResponse)?.list?.filter((wine) => !wine.image.includes('example.com')) ?? [],
  );

  const queryClient = useQueryClient();

  const prefetchWineInfo = async (wineid: number) => {
    await queryClient.prefetchQuery({
      queryKey: ['wineDetail', wineid],
      queryFn: () => getWineInfoForClient(wineid),
      staleTime: 1000 * 60 * 5,
    });
  };

  // // 데이터 프리패칭용
  useEffect(() => {
    wineList?.forEach((wine) => {
      prefetchWineInfo(wine.id);
    });
  }, [wineList]);

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !data) return <p>와인 데이터를 불러올 수 없습니다.</p>;

  return (
    <div
      className='flex flex-col gap-[24px] px-[16px] mt-[12px] min-w-[370px]
    md:px-[20px] md:mt-[24px] 
    xl:px-0 max-w-[1140px] mx-auto xl:max-w-[800px] xl:800px'
    >
      {wineList?.map((wine) => (
        <Link href={`/wines/${wine.id}`} key={wine.id} className='no-underline'>
          <div className='w-full bg-white border border-gray-300 rounded-xl flex flex-col relative min-w-[320px]'>
            <ImageCard
              imageSrc={wine.image}
              className='pt-[20px] pb-0 border-none md:pl-[30px]'
              imageClassName={cn(
                'block object-contain rounded-md',
                'w-[60px] h-[208px] mt-[30px] min-w-[50px] min-h-[180px]',
                'md:min-w-0 md:min-h-0',
                'md:w-[70px] md:h-[210px] md:ml-[10px] md:mt-[30px]',
                'xl:w-[60px] xl:h-[205px] xl:ml-[25px] xl:mt-[30x] xl:mr-[20px]',
              )}
              rightSlot={null}
            >
              <div className='flex flex-col w-full px-[16px] md:px-0'>
                <div className='flex flex-col w-full ml-0 mt-[20px] gap-[8px] md:w-[360px] md:ml-[36px] md:gap-[10px]'>
                  <div className='custom-text-xl-semibold text-gray-800 leading-[32px] h-auto max-w-[220px] mt-[5px] md:text-[30px] md:max-w-[400px] md:min-h-[10px]'>
                    {wine.name}
                  </div>
                  <div className='[custom-text-md-regular] text-gray-500 leading-[24px] h-[24px] md:text-[16px] md:leading-[26px] md:h-[26px] break-words'>
                    {wine.region}
                  </div>
                  <Button
                    variant='purpleLight'
                    fontSize={null}
                    width={null}
                    size={null}
                    className='text-[14px] text-purpleDark font-bold leading-[24px] px-[10px] py-[2px] rounded-[10px] h-[30px] w-full max-w-[86px] md:max-w-[114px] md:text-[18px] md:px-[2px] md:py-[2px] md:rounded-[12px] md:w-[114px] md:h-[42px] md:mt-[5px]'
                  >
                    ₩ {wine.price.toLocaleString()}
                  </Button>
                </div>
                <div className='flex flex-row items-start justify-between mt-[23px] w-full ml-0 gap-[6px] md:hidden'>
                  <div className='flex items-start gap-[6px]'>
                    <div className='text-[28px] font-extrabold text-gray-800 w-auto h-auto'>
                      {wine.avgRating?.toFixed(1)}
                    </div>
                    <div className='flex flex-col gap-[5px] ml-[15px] w-[100px] h-auto mt-[-6px]'>
                      <div className='flex gap-[4px] flex-nowrap'>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={cn(
                              wine.avgRating >= i + 1 ? 'fill-purpleDark' : 'fill-gray-300',
                              'w-3 h-3',
                            )}
                          />
                        ))}
                      </div>
                      <div className='custom-text-xs-regular text-gray-500 break-words'>
                        {wine.reviewCount}개의 후기
                      </div>
                    </div>
                  </div>
                  <button type='button' className='w-[36px] h-[36px] p-[4px] rounded'>
                    <NextIcon className='w-full h-full text-gray-300 hover:text-gray-500' />
                  </button>
                </div>
              </div>
            </ImageCard>
            <div className='hidden md:flex flex-col items-start absolute top-[35px] right-[-20px]'>
              <div className='text-[48px] font-extrabold text-gray-800 leading-[48px] md:mt-[9px]'>
                {wine.avgRating?.toFixed(1)}
              </div>
              <div className='flex flex-col gap-[5px] w-[160px] mt-[15px] items-start'>
                <div className='flex gap-[4px] flex-nowrap'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        wine.avgRating >= i + 1 ? 'fill-purpleDark' : 'fill-gray-300',
                        'w-[16px] h-[16px]',
                      )}
                    />
                  ))}
                </div>
                <div className='custom-text-sm-regular text-gray-500 break-words w-[100px] text-left mt-[7px]'>
                  {wine.reviewCount}개의 후기
                </div>
              </div>
            </div>
            <button
              type='button'
              className='w-[40px] h-[40px] p-[4px] rounded flex-shrink-0 ml-10 hidden md:block absolute top-[185px] right-[20px]'
            >
              <NextIcon className='w-full h-full text-gray-300 hover:text-gray-500' />
            </button>
            <div className='w-full h-px bg-gray-300 mt-[-1px]' />
            <div className='px-[25px] py-[20px] xl:w-[800px] xl:h-[110px]'>
              <div className='text-[14px] font-semibold text-gray-800 mb-[4px] break-words'>
                최신 후기
              </div>
              <div className='text-[14px] text-gray-500 leading-[24px] break-words'>
                {wine.recentReview ? wine.recentReview.content : '아직 후기가 없습니다.'}
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div ref={observerRef} className='h-[1px]' />
    </div>
  );
}
