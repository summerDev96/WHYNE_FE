import React from 'react';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { getWineInfoForServer } from '@/api/wineid';
import { getWineInfoForClient } from '@/api/wineid';
import { ImageCard } from '@/components/common/card/ImageCard';
import Reviews from '@/components/wineDetail/Reviews';
import WineContent from '@/components/wineDetail/WineContent';
import WineRating from '@/components/wineDetail/WineRating';
import { cn } from '@/lib/utils';
import { GetWineInfoResponse } from '@/types/WineTypes';

interface WinePageProps {
  wineData?: GetWineInfoResponse; // getWineInfo가 반환하는 WineInfo 타입을 사용
  error?: string;
  dehydratedState: any;
  parsedWineId: number;
}

// 의논할 거
///이건 도대체 왜 필요한거야? 이미 데이터는 목록에서 캐싱해오잖아
//-> getSeverSideProps는 여기 페이지에 들어와야(요청이 와야) 받아오기 시작하니까
// 목록에서 프리패치로 캐싱한 데이터 가져다 쓰는게 더 빠르지 않나?
//**-> 하지만 북마크,즐겨찾기,방문기록,새로고침(이 페이지에 바로 접근하는 경우)등을 생각한다면?
// +페이지 특성상 SEO 잘 되어야 좋을 것 같긴해 와인 정보 보려고 검색하는 사람도 많을테니*/
export const getServerSideProps: GetServerSideProps<WinePageProps> = async (context) => {
  const { req, params } = context;
  const wineid = params?.wineid;
  const parsedWineId = Number(wineid);
  const queryClient = new QueryClient();

  // 1. 요청 헤더에서 쿠키(accessToken, refreshToken) 추출
  const cookieHeader = req.headers.cookie || '';
  const cookies = Object.fromEntries(
    cookieHeader
      .split('; ')
      .map((c) => c.split('='))
      .map(([key, ...val]) => [key, decodeURIComponent(val.join('='))]),
  );

  let accessToken = cookies.accessToken;
  let refreshToken = cookies.refreshToken;

  //2. 추출한 토큰들을 토대로 서버에서 요청보내 캐싱해두기
  try {
    await queryClient.prefetchQuery({
      queryKey: ['wineDetail', parsedWineId],
      queryFn: () => getWineInfoForServer(parsedWineId, { accessToken, refreshToken, context }),
      staleTime: 1000 * 60 * 5,
      retry: false,
    });
    console.log(`[getServerSideProps] 와인 상세 정보 프리패치 성공 (ID: ${parsedWineId})`);
  } catch (error: any) {
    console.error(`[SSR] 와인 상세 정보 로딩 중 최종 에러:`, error.message || error);
  }

  // prefetch한 queryClient의 캐시를 직렬화, 클라이언트에 전달.
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      parsedWineId,
    },
  };
};

export default function WineInfoById(props: WinePageProps) {
  const router = useRouter();
  const { parsedWineId: id } = props;
  // 주소로 직접 들어왔을 때(SSR) //목록에서 링크로 들어왔을 때(CSR)
  const parsedWineId = id ? id : Number(router.query.wineid);

  //서버든 목록(클라이언트든) 캐싱된 데이터 사용
  const { data, isLoading } = useQuery({
    queryKey: ['wineDetail', parsedWineId],
    queryFn: () => getWineInfoForClient(parsedWineId),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div className='w-300 bg-red-400 h-20'>123</div>; //테스트용

  if (!data) return <></>; //테스트용

  return (
    <main className='mx-auto px-4 md:px-5 xl:px-0 max-w-[1140px]  min-w-[343px]'>
      <ImageCard
        imageSrc={''}
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
