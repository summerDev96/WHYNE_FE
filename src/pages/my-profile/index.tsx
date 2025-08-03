import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import ErrorModal from '@/components/common/Modal/ErrorModal';
import Profile from '@/components/my-profile/Profile';
import { ReviewList } from '@/components/my-profile/ReviewList';
import { TabNav } from '@/components/my-profile/Tab';
import { WineList } from '@/components/my-profile/WineList';
import { useUser } from '@/hooks/useUser';

/**
 * MyProfile
 *
 * 마이페이지 전체 레이아웃을 구성하는 컴포넌트
 *
 * - 프로필 정보(Profile)
 * - 탭(TabNav)을 통해 내가 작성한 리뷰/등록한 와인 리스트 조회
 * - 각 리스트의 총 개수를 상위에서 관리
 */
export default function MyProfile() {
  const router = useRouter();
  const { isLoggedIn, isUserLoading } = useUser();
  const [showModal, setShowModal] = useState(false);

  const [tab, setTab] = useState<'reviews' | 'wines'>('reviews');
  const [reviewsCount, setReviewsCount] = useState(0);
  const [winesCount, setWinesCount] = useState(0);

  useEffect(() => {
    if (!isUserLoading && !isLoggedIn) {
      setShowModal(true);
    }
  }, [isLoggedIn, isUserLoading]);

  const handleRedirect = () => {
    router.push('/signin'); // 로그인 페이지로 이동
  };

  return (
    <div>
      <ErrorModal
        open={showModal}
        onOpenChange={() => {}}
        onConfirm={handleRedirect}
        confirmText='로그인 하러 가기'
      >
        마이페이지는 로그인 후 이용할 수 있어요
      </ErrorModal>
      {isLoggedIn && (
        <main className='max-w-6xl mx-auto p-4 gap-6 flex flex-col xl:flex-row'>
          {/* 프로필 섹션 */}
          <Profile />

          {/* 탭 + 리스트 */}
          <div className='flex flex-col flex-1'>
            {/* 탭 네비게이션: 현재 탭, 탭 전환 함수, 각각의 개수 전달 */}
            <TabNav
              current={tab}
              onChange={setTab}
              reviewsCount={reviewsCount}
              winesCount={winesCount}
            />

            {/* 탭 상태에 따라 리스트 컴포넌트 조건부 렌더링 */}
            {tab === 'reviews' ? (
              <ReviewList setTotalCount={setReviewsCount} />
            ) : (
              <WineList setTotalCount={setWinesCount} />
            )}
          </div>
        </main>
      )}
    </div>
  );
}
