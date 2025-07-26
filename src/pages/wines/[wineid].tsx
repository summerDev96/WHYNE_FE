import React from 'react';

// import { ImageCard } from '@/components/common/card/ImageCard';
// import { testReviews, wineInfo } from '@/components/wineDetail/mock';
// import WineContent from '@/components/wineDetail/WineContent';
// import WineRating from '@/components/wineDetail/WineRating';
// import WineReviewCard from '@/components/wineDetail/WineReviewCard';
// import { cn } from '@/lib/utils';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { getWineInfo } from '.';

///이건 도대체 왜 필요한거야? 이미 데이터는 목록에서 캐싱해오잖아
//-> getSeverSideProps는 여기 페이지에 들어와야 돌아가기 시작하니까 어차피 프리패치로 캐싱한 데이터 가져다 쓰는게 더 빠를듯

//**-> 하지만 북마크,즐겨찾기,방문기록,새로고침(이 페이지에 바로 접근하는 경우)등을 생각한다면? 이것도 필요하긴 하네....-> 근데 굳이 필요할까? */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { wineid } = context.query; // URL 파라미터에서 와인 ID 가져오기
  const parsedWineId = Number(wineid);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['wineDetail', parsedWineId], // 클라이언트 useQuery와 동일한 키 사용
    queryFn: () => getWineInfo(parsedWineId), // 클라이언트 useQuery와 동일한 함수 사용
    staleTime: 1000 * 60 * 5, // 캐시 유효 시간 (클라이언트 useQuery와 일치시키는 것이 좋습니다)
  });

  // 3. dehydratedState 반환: prefetch한 QueryClient의 캐시를 직렬화하여 props로 전달합니다.
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function WineInfoById() {
  // const { name, region, price, image } = wineInfo;
  const router = useRouter();
  const { wineid } = router.query;

  const { data } = useQuery({
    queryKey: ['wineDetail', wineid],
    queryFn: () => getWineInfo(Number(wineid)),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <main className='mx-auto px-4 md:px-5 xl:px-0 max-w-[1140px]  min-w-[343px]'>
      <div>{data?.name}</div>
      {/* <ImageCard
        imageSrc={image}
        imageClassName={IMAGE_CLASS_NAME}
        className={cn(
          'mx-auto relative w-full h-[190px] md:h-[260px]  rounded-[16px] mt-[29px] md:mt-[62px] mb-[40px] md:mb-[60px] border-0',
          'bg-gradient-to-tr from-white from-50% to-primary/20 to-100%', //그래디언트 설정 추후 변경
          'shadow-sm',
        )}
      >
        <WineContent name={name} region={region} price={price} />
      </ImageCard>
      <div className='flex flex-col xl:flex-row max-w-[1140px] w-full mx-auto justify-between '>
        <div className='flex-col  order-2 xl:order-1 xl:max-w-[1140px] '>
          <h2 className='sr-only xl:not-sr-only !mb-[22px] xl:custom-text-xl-bold'>리뷰 목록</h2>
          <ul>
            {testReviews.map((review) => (
              <li key={review.id} className='mb-[16px] md:mb-[24px] xl:mb-[20px]'>
                <WineReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
        <WineRating rating={4.8} reviewCount={47} ratings={[90, 80, 50, 30, 20]}></WineRating>
      </div> */}
    </main>
  );
}

// const IMAGE_CLASS_NAME =
//   'w-[58px] md:w-[84px] xl:w-[58px] h-[209px] md:h-[302px] xl:h-[209px] absolute bottom-0 left-[20px] md:left-[60px] xl:left-[100px]';
