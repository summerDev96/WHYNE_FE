import React, { useState } from 'react';

import { mockMyReviewsPage1, mockMyWinesPage1 } from './mockUser';
import Profile from './Profile';
import { ReviewList } from './ReviewList';
import { TabNav } from './Tab';
import { WineList } from './WineList';

export default function MyProfile() {
  // 탭 상태: 'reviews' | 'wines'
  const [tab, setTab] = useState<'reviews' | 'wines'>('reviews');

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
            reviewsCount={mockMyReviewsPage1.totalCount}
            winesCount={mockMyWinesPage1.totalCount}
          />

          {/* 탭에 따라 ReviewList 또는 WineList에 props 전달 */}
          {tab === 'reviews' ? <ReviewList /> : <WineList />}
        </div>
      </main>
    </div>
  );
}
