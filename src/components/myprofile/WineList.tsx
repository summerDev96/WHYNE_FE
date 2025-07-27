import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getMyWines } from '@/api/myWines';
import DotIcon from '@/assets/icons/dot.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import MenuDropdown from '@/components/common/dropdown/MenuDropdown';
import { Badge } from '@/components/ui/badge';

import type { MyWinesResponse, MyWine } from '@/types/MyWinesTypes';
/**
 * WineList 컴포넌트
 * - React Query의 useQuery 훅을 사용해 와인 데이터를 패칭
 * - 로딩 및 에러 상태를 처리한 뒤, ImageCard 컴포넌트로 리스트를 렌더링
 */
export function WineList() {
  const LIMIT = 10;

  // React Query로 와인 목록 패칭
  const { data, isLoading, isError } = useQuery<MyWinesResponse, Error>({
    queryKey: ['myWines', { cursor: 0, limit: LIMIT }],
    queryFn: () => getMyWines(0, LIMIT),
    staleTime: 5 * 60 * 1000,
  });

  // 로딩 중 표시
  if (isLoading) {
    return <p className='text-center py-4'>와인 불러오는 중…</p>;
  }

  // 에러 시 표시
  if (isError || !data) {
    return <p className='text-center py-4'>와인 불러오기 실패</p>;
  }

  return (
    <div className='flex flex-col mt-9 space-y-9 md:space-y-16 md:mt-16'>
      {data.list.map((wine: MyWine) => (
        <ImageCard
          key={wine.id}
          className='relative pl-24 min-h-[164px] md:min-h-[228px] md:pl-44 md:pt-10'
          imageSrc={wine.image}
          imageClassName='object-contain absolute left-3 bottom-0 h-[185px] md:h-[270px] md:left-12'
          rightSlot={
            // dot 아이콘 클릭 시 드롭다운 오픈
            <MenuDropdown
              trigger={
                <button className='w-6 h-6 text-gray-500 hover:text-primary transition-colors'>
                  <DotIcon />
                </button>
              }
              options={[
                { label: '수정하기', value: 'edit' },
                { label: '삭제하기', value: 'delete' },
              ]}
              onSelect={(value) => console.log(`${value} clicked for wine id: ${wine.id}`)}
            />
          }
        >
          {/* 카드 내부: 와인 정보 */}
          <div className='flex flex-col items-start justify-center h-full'>
            <h4 className='text-xl/6 font-semibold text-gray-800 mb-4 md:text-3xl md:mb-5'>
              {wine.name} {/* 와인 이름 */}
            </h4>
            <p className='custom-text-md-legular text-gray-500 mb-2 md:custom-text-lg-legular md:mb-4'>
              {wine.region} {/* 생산 지역 */}
            </p>
            <Badge variant='priceBadge'>
              <span className='inline-block w-full h-full pt-[3px]'>
                {/* 가격 표시 */}₩ {wine.price.toLocaleString()}
              </span>
            </Badge>
          </div>
        </ImageCard>
      ))}
    </div>
  );
}
