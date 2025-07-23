// pages/myprofile.tsx
import React, { useState } from 'react';

import { mockUser } from './mockUser';
import Profile from './Profile';
import { ReviewList } from './ReviewList';
import { TabNav } from './Tab';
import { WineList } from './WineList';

export default function MyProfile() {
  const [tab, setTab] = useState<'reviews' | 'wines'>('reviews');

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-md mx-auto p-4 space-y-6'>
        {/* Profile */}
        <Profile nickname={mockUser.nickname} profileImageUrl={mockUser.profileImageUrl} />

        {/* Tabs */}
        <div className='flex flex-col space-y-9'>
          <TabNav current={tab} onChange={setTab} />
          {tab === 'reviews' ? (
            <ReviewList items={mockUser.reviews} />
          ) : (
            <WineList items={mockUser.wines} />
          )}
        </div>
      </main>
    </div>
  );
}
