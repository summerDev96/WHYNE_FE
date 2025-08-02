import React from 'react';

import Link from 'next/link';

import NoReviewIcon from '@/assets/icons/noReview.svg';
import NoWineIcon from '@/assets/icons/noWine.svg';
import { Button } from '@/components/ui/button';

interface MyPageEmptyProps {
  type: 'reviews' | 'wines';
}

/**
 * 내 프로필 페이지에서 데이터가 없을 때 표시되는 공통 Empty 컴포넌트
 * - type: 'reviews' | 'wines' (내가 쓴 후기 / 내가 등록한 와인)
 * - 리뷰는 '와인 보러가기' 링크
 * - 와인은 와인 등록 버튼
 */
export default function MyPageEmpty({ type }: MyPageEmptyProps) {
  const isReview = type === 'reviews';

  return (
    <div className='py-28 flex flex-col items-center justify-center gap-10 md:gap-12'>
      <div className='w-[150px] h-[158px] text-gray-400'>
        {isReview ? <NoReviewIcon /> : <NoWineIcon />}
      </div>

      <Button variant={'purpleDark'} className='w-[150px] h-[48px] md:w-[169px] '>
        <Link href='/wines'>와인 보러가기</Link>
      </Button>
    </div>
  );
}
