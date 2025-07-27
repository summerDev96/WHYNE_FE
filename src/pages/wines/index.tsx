import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import apiClient from '@/api/apiClient';
import { getWineInfo } from '@/api/apiServer';

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

// interface GetWineInfoResponse {
//   id: number;
//   name: string;
//   region: string;
//   image: string;
//   price: number;
//   type: string;
//   avgRating: number;
//   reviewCount: number;
//   recentReview: {
//     user: {
//       id: number;
//       nickname: string;
//       image: string;
//     };
//     updatedAt: string;
//     createdAt: string;
//     content: string;
//     aroma: string[];
//     rating: number;
//     id: number;
//   };
//   userId: number;
//   reviews: [
//     {
//       id: number;
//       rating: number;
//       lightBold: number;
//       smoothTannic: number;
//       drySweet: number;
//       softAcidic: number;
//       aroma: string[];
//       content: string;
//       createdAt: string;
//       updatedAt: string;
//       user: {
//         id: number;
//         nickname: string;
//         image: string;
//       };
//       isLiked: {};
//     },
//   ];
//   avgRatings: {
//     additionalProp1: number;
//     additionalProp2: number;
//     additionalProp3: number;
//   };
// }

export const getWines = (): Promise<GetWineListResponse> => {
  return apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/wines`);
};

function WineList() {
  const wines = [{ id: 1361 }, { id: 1362 }, { id: 1363 }];

  const queryClient = useQueryClient();

  const prefetchWineInfo = async (wineid: number) => {
    await queryClient.prefetchQuery({
      queryKey: ['wineDetail', wineid],
      queryFn: () => getWineInfo(wineid),
      staleTime: 1000 * 60 * 5,
    });
  };

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
