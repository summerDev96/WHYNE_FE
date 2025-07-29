import React, { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getWineInfoForClient } from '@/api/getWineInfo';
import { ImageCard } from '@/components/common/card/ImageCard';
import Reviews from '@/components/wineDetail/Reviews';
import WineContent from '@/components/wineDetail/WineContent';
import WineRating from '@/components/wineDetail/WineRating';
import { cn } from '@/lib/utils';
import useWineStore from '@/stores/wineStore';
import { GetWineInfoResponse } from '@/types/WineTypes';

interface WinePageProps {
  wineData?: GetWineInfoResponse; // getWineInfo가 반환하는 WineInfo 타입을 사용
  error?: string;
  dehydratedState: any;
  parsedWineId: number;
}

export default function WineInfoById(props: WinePageProps) {
  const router = useRouter();
  const { parsedWineId: id } = props;
  // 주소로 직접 들어왔을 때(SSR) //목록에서 링크로 들어왔을 때(CSR)
  const parsedWineId = id ? id : Number(router.query.wineid);
  const setNowWine = useWineStore((state) => state.setNowWine);

  //서버든 목록(클라이언트든) 캐싱된 데이터 사용
  const { data, isLoading } = useQuery({
    queryKey: ['wineDetail', parsedWineId],
    queryFn: () => getWineInfoForClient(parsedWineId),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) setNowWine(data);
  }, [data]);

  if (isLoading) return <div className='w-300 bg-red-400 h-20'>123</div>; //테스트용

  if (!data) throw new Error('데이터가 없습니다.');

  return (
    <main className='mx-auto px-4 md:px-5 xl:px-0 max-w-[1140px]  min-w-[343px]'>
      <ImageCard
        imageSrc={data.image}
        imageClassName={IMAGE_CLASS_NAME}
        className={cn(
          'mx-auto relative w-full h-[190px] md:h-[260px] rounded-[16px] mt-[29px] md:mt-[62px] mb-[40px] md:mb-[60px] border-0',
          'bg-gradient-to-tr from-white from-50% to-primary/20 to-100%', //그래디언트 설정 추후 변경
          'shadow-sm',
        )}
      >
        <WineContent name={data.name} region={data.region} price={data.price} />
      </ImageCard>
      <div className='flex flex-col xl:flex-row max-w-[1140px] w-full mx-auto justify-between '>
        <div className='flex-col  order-2 xl:order-1 xl:max-w-[1140px] '>
          <h2 className='sr-only xl:not-sr-only !mb-[22px] xl:custom-text-xl-bold'>리뷰 목록</h2>
          <ul>
            <Reviews reviews={data.reviews} reviewCount={data.reviewCount} />
          </ul>
        </div>
        <WineRating
          rating={data.avgRating}
          reviewCount={data.reviewCount}
          ratings={Object.values(data.avgRatings)}
        ></WineRating>
      </div>
    </main>
  );
}

const IMAGE_CLASS_NAME =
  'w-[58px] md:w-[84px] xl:w-[58px] h-[209px] md:h-[302px] xl:h-[209px] absolute bottom-0 left-[20px] md:left-[60px] xl:left-[100px]';
