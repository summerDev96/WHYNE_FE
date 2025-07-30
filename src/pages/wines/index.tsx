import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import apiClient from '@/api/apiClient';
import { getWineInfoForClient } from '@/api/getWineInfo';
import WineFilter from '@/components/common/winelist/WineFilter';
import WineListCard from '@/components/common/winelist/WineListCard';
import WineSlider from '@/components/common/winelist/WineSlider';

/*이 페이지 자체가 테스트용 추후 삭제*/

interface GetWineListResponse {
  totalCount: number;
  nextCursor: number;
  list: [
    {
      id: number;
      name: string;
      region: string;
      image: string;
      price: number;
      type: string;
      avgRating: number;
      reviewCount: number;
      recentReview: {
        user: {
          id: number;
          nickname: string;
          image: string;
        };
        updatedAt: string;
        createdAt: string;
        content: string;
        aroma: ['CHERRY'];
        rating: number;
        id: number;
      };
      userId: number;
    },
  ];
}

export const getWines = (): Promise<GetWineListResponse> => {
  return apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/wines`);
};

export default function Wines() {
  const wines = [{ id: 1377 }];

  const queryClient = useQueryClient();

  //테스트용 캐시 지우기
  queryClient.removeQueries({ queryKey: ['wineDetail'] });

  const prefetchWineInfo = async (wineid: number) => {
    await queryClient.prefetchQuery({
      queryKey: ['wineDetail', wineid],
      queryFn: () => getWineInfoForClient(wineid),
      staleTime: 1000 * 60 * 5,
    });
  };

  // // 데이터 프리패칭용
  useEffect(() => {
    wines.forEach((wine) => {
      prefetchWineInfo(wine.id);
    });
  }, []);
  return (
    <div>
      <Link href='/wines/1377'>1377</Link>
      <WineSlider />
      <WineFilter />
      <div className='xl:hidden'>
        <WineListCard />
      </div>
    </div>
  );
}
