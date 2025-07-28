import Link from 'next/link';

import { ContentSection } from '@/components/home/ContentSection';
import { HeroSection } from '@/components/home/HeroSection';
import EditWineModal from '@/components/Modal/WineModal/EditWineModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  const data = {
    wineId: 1376,
    name: 'Chateau Margaux',
    price: 250000,
    region: 'Bordeaux, France',
    image: 'https://example.com/wine-image.jpg',
    type: 'RED',
    avgRating: 4.7,
  } as const;

  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px] mt-6 xl:mt-[80px]'>
      <EditWineModal wine={data} />
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
