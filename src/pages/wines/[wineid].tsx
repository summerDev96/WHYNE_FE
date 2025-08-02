import React, { useEffect } from 'react';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getWineInfoForClient } from '@/api/getWineInfo';
import { ImageCard } from '@/components/common/card/ImageCard';
import WineContent from '@/components/wineDetail/WineContent';
import WineRating from '@/components/wineDetail/WineRating';
import { cn } from '@/lib/utils';
import useWineStore from '@/stores/wineStore';
import { GetWineInfoResponse } from '@/types/WineTypes';

interface WinePageProps {
  wineData?: GetWineInfoResponse; // getWineInfo가 반환하는 WineInfo 타입을 사용
  error?: string;
  dehydratedState?: any;
  parsedWineId: number;
}

const Reviews = dynamic(() => import('@/components/wineDetail/Reviews'), { ssr: false });

export default function WineInfoById(props: WinePageProps) {
  const router = useRouter();
  const { parsedWineId: id } = props;
  // 주소로 직접 들어왔을 때(SSR) //목록에서 링크로 들어왔을 때(CSR)
  const parsedWineId = id ? id : Number(router.query.wineid);
  const setNowWine = useWineStore((state) => state.setNowWine);

  //서버든 목록(클라이언트든) 캐싱된 데이터 사용
  const { data } = useQuery({
    queryKey: ['wineDetail', parsedWineId],
    queryFn: () => getWineInfoForClient(parsedWineId),
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });

  useEffect(() => {
    if (data) setNowWine(data);
  }, [data]);

  if (!data) {
    return;
  }

  return (
    <>
      <Head>
        <title>{`${data.name} 상세정보`}</title>
        <meta
          name='description'
          content={`지역:${data.region} 평균가격:${data.price} 평균별점:${data.avgRating} 리뷰:${data.reviewCount}`}
        />
        <meta property='og:title' content={`${data.name} 상세정보`} />
        <meta
          property='og:description'
          content={`지역:${data.region} 평균가격:${data.price} 평균별점:${data.avgRating} 리뷰:${data.reviewCount}`}
        />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_VERCEL_URL} />
      </Head>

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
            <Reviews wine={data} reviews={data.reviews} reviewCount={data.reviewCount} />
          </div>
          <WineRating
            rating={data.avgRating}
            reviewCount={data.reviewCount}
            ratings={Object.values(data.avgRatings)}
          ></WineRating>
        </div>
      </main>
    </>
  );
}

const IMAGE_CLASS_NAME =
  'w-[58px] md:w-[84px] xl:w-[58px] h-[209px] md:h-[302px] xl:h-[209px] absolute bottom-0 left-[20px] md:left-[60px] xl:left-[100px]';

export const getServerSideProps: GetServerSideProps<WinePageProps> = async (context) => {
  const { params } = context;
  const wineid = params?.wineid;
  const parsedWineId = Number(wineid);
  const queryClient = new QueryClient();
  const cookies = context.req?.headers.cookie || '';

  try {
    await queryClient.prefetchQuery({
      queryKey: ['wineDetail', parsedWineId],
      queryFn: async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wines/${parsedWineId}`,
          {
            headers: {
              Cookie: cookies, // API Route에 쿠키 전달
            },
          },
        );
        return res.data;
      },
      staleTime: 0,
      retry: false,
    });
  } catch (error: any) {
    console.error(`[SSR] 와인 상세 정보 로딩 중 최종 에러:`, error.message || error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      parsedWineId,
    },
  };
};
