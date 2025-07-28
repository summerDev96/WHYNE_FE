import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import apiClient from '@/api/apiClient';
import { getWineInfoForClient } from '@/api/wineid';

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

function WineList() {
  const wines = [{ id: 1361 }, { id: 1362 }, { id: 1363 }];

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
      {wines.map((el) => (
        <Link key={el.id} href={`/wines/${el.id}`}>
          {el.id}
          <br />
        </Link>
      ))}
    </div>
  );
}

export default WineList;
