import Link from 'next/link';

import { ContentSection } from '@/components/home/ContentSection';
import { HeroSection } from '@/components/home/HeroSection';
import EditReviewModal from '@/components/Modal/ReviewModal/EditReviewModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  const dummyReviewData = {
    reviewId: 3101,
    rating: 4,
    sliderLightBold: 5,
    sliderSmoothTanic: 5,
    sliderdrySweet: 3,
    slidersoftAcidic: 7,
    aroma: ['CHERRY', 'OAK', 'FLOWER'], // 영어 코드
    content: '테스트용 기존 리뷰 내용입니다.',
  };
  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px] mt-6 xl:mt-[80px]'>
      <EditReviewModal wineName='테스트 와인' reviewData={dummyReviewData} />
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
