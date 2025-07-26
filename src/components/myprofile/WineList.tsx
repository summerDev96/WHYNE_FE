import React from 'react';

import { useQuery } from '@tanstack/react-query';

import DotIcon from '@/assets/icons/dot.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import MenuDropdown from '@/components/common/dropdown/MenuDropdown';
import { Badge } from '@/components/ui/badge';

import { mockMyWinesPage1 } from './mockUser';

/**
 * Wine 타입 정의 (mock 데이터에서 추론)
 */
type Wine = (typeof mockMyWinesPage1.list)[number];

/**
 * 데이터 가져오는 함수 (현재는 mock, 추후 API 호출로 교체)
 * 데이터 패치 내용은 무한스크롤 훅 구현 후 수정될 예정입니다
 */
async function fetchWines(): Promise<Wine[]> {
  return mockMyWinesPage1.list;
}

/**
 * WineList 컴포넌트
 * - React Query의 useQuery 훅을 사용해 리뷰 데이터를 패칭
 * - 로딩 및 에러 상태를 처리한 뒤, ImageCard 컴포넌트로 리스트를 렌더링
 */
export function WineList() {
  // React Query로 와인 목록 패칭
  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery<Wine[], Error>({
    queryKey: ['myWines'],
    queryFn: fetchWines,
  });

  // 로딩 중 표시
  if (isLoading) {
    return <p className='text-center py-4'>와인 불러오는 중…</p>;
  }

  // 에러 시 표시
  if (isError) {
    return <p className='text-center py-4'>와인 불러오기 실패</p>;
  }

  return (
    <div className='flex flex-col mt-9 space-y-9 md:space-y-16 md:mt-16'>
      {items.map((w) => (
        <ImageCard
          key={w.id}
          className='relative pl-24 min-h-[164px] md:min-h-[228px] md:pl-44 md:pt-10'
          imageSrc={w.image}
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
              onSelect={(value) => console.log(`${value} clicked for wine id: ${w.id}`)}
            />
          }
        >
          {/* 카드 내부: 와인 정보 */}
          <div className='flex flex-col items-start justify-center h-full'>
            <h4 className='text-xl/6 font-semibold text-gray-800 mb-4 md:text-3xl md:mb-5'>
              {w.name} {/* 와인 이름 */}
            </h4>
            <p className='custom-text-md-legular text-gray-500 mb-2 md:custom-text-lg-legular md:mb-4'>
              {w.region} {/* 생산 지역 */}
            </p>
            <Badge variant='priceBadge'>
              <span className='inline-block w-full h-full pt-[3px]'>
                {/* 가격 표시 */}₩ {w.price.toLocaleString()}
              </span>
            </Badge>
          </div>
        </ImageCard>
      ))}
    </div>
  );
}
