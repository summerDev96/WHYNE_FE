import { useState } from 'react';

import Link from 'next/link';

import { ContentSection } from '@/components/home/ContentSection';
import { HeroSection } from '@/components/home/HeroSection';
import DeleteModal from '@/components/Modal/DeleteModal/DeleteModal';
import FilterModal from '@/components/Modal/FilterModal/FilterModal';
import AddReviewModal from '@/components/Modal/ReviewModal/AddReviewModal';
import AddWineModal from '@/components/Modal/WineModal/AddWineModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px] mt-6 xl:mt-[80px]'>
      <button onClick={() => setShowDeleteModal(true)}>삭제</button>
      <button onClick={() => setShowRegisterModal(true)}>와ㅓ인추가</button>
      <button onClick={() => setIsFilterOpen(true)}>필터</button>
      <DeleteModal
        id={1399}
        type='review'
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <AddWineModal
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
      />
      <AddReviewModal wineId={1399} wineName='돔뇽리뇽' />
      <FilterModal open={isFilterOpen} onOpenChange={setIsFilterOpen} />
      <HeroSection />
      <main>
        <ContentSection />
      </main>
      <footer className='pb-[62px]'>
        <Link href='/wines'>
          <Button
            variant='purpleDark'
            size='onlyLanding'
            width='onlyLanding'
            className='block mx-auto'
          >
            와인 보러가기
          </Button>
        </Link>
      </footer>
    </div>
  );
}
