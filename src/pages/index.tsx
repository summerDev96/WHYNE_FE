import { motion } from 'framer-motion';
import Link from 'next/link';

import { ContentSection } from '@/components/home/ContentSection';
import { HeroSection } from '@/components/home/HeroSection';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px] mt-6 xl:mt-[80px]'>
      <HeroSection />
      <main>
        <ContentSection />
      </main>
      <footer className='pb-[62px]'>
        <motion.div
          initial={{ opacity: 0, y: 100 }} //화면에 나타나기 전 위치
          whileInView={{ opacity: 1, y: 0 }} //애니메이션 실행했을때 나타날 위치
          viewport={{ once: true, amount: 0.3 }} //어떤조건인지(한번만 실행, 컴포넌트30%들어올시 실행)
          transition={{ duration: 0.1, ease: 'easeOut' }} //애니메이션 속도
        >
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
        </motion.div>
      </footer>
    </div>
  );
}
