import React, { useState } from 'react';

import Profile from '@/components/myprofile/Profile';
import { ReviewList } from '@/components/myprofile/ReviewList';
import { TabNav } from '@/components/myprofile/Tab';
import { WineList } from '@/components/myprofile/WineList';

export default function MyProfile() {
  // 탭 상태: 'reviews' | 'wines'
  const [tab, setTab] = useState<'reviews' | 'wines'>('reviews');

  // 각각의 totalCount를 상태로 관리
  const [reviewsCount, setReviewsCount] = useState(0);
  const [winesCount, setWinesCount] = useState(0);

  return (
    <div className='min-h-screen'>
      <main className='max-w-6xl mx-auto p-4 gap-6 flex flex-col xl:flex-row'>
        {/* 프로필 섹션 */}
        <Profile nickname='홍길동' profileImageUrl='https://picsum.photos/64' />

        {/* 탭 & 리스트 섹션 */}
        <div className='flex flex-col flex-1'>
          <TabNav
            current={tab}
            onChange={setTab}
            reviewsCount={reviewsCount}
            winesCount={winesCount}
          />

          {/* 탭에 따라 ReviewList 또는 WineList 렌더링 */}
          {tab === 'reviews' ? (
            <ReviewList setTotalCount={setReviewsCount} />
          ) : (
            <WineList setTotalCount={setWinesCount} />
          )}
        </div>
      </main>
    </div>
  );
}
