import Link from 'next/link';

import { ContentSection } from '@/components/home/ContentSection';
import { HeroSection } from '@/components/home/HeroSection';
import FilterModal from '@/components/Modal/FilterModal/FilterModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px] mt-6 xl:mt-[80px]'>
      <FilterModal />
      <HeroSection />
      <main>
        <ContentSection />
      </main>
      <footer>
        <Link href='/wines'>
          <Button
            variant='purpleDark'
            size='onlyLanding'
            width='onlyLanding'
            className='block mx-auto mb-[62px]'
          >
            와인 보러가기
          </Button>
        </Link>
      </footer>
    </div>
  );
}
