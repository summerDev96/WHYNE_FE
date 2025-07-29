import Link from 'next/link';

import { ContentSection } from '@/components/home/ContentSection';
import { HeroSection } from '@/components/home/HeroSection';
import EditWineModal from '@/components/Modal/WineModal/EditWineModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  const dummyWine = {
    wineId: 1,
    name: 'Château Margaux 2015',
    price: 450000,
    region: 'France',
    image: 'https://example.com/images/chateau-margaux.jpg',
    type: 'RED',
    avgRating: 4.8,
  } as const;
  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px] mt-6 xl:mt-[80px]'>
      <EditWineModal wine={dummyWine} />
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
