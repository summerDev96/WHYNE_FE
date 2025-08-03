import { useEffect, useState } from 'react';

import NextIcon from '@/assets/icons/Next.svg';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 3000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  /*뱃지 색깔: bg-primary-100 통일: bg-primary*/
  return (
    <button
      onClick={scrollToTop}
      className='
    fixed bottom-[157px] right-[20px] md:bottom-[90px] z-50
    rounded-full bg-gray-300
    hover:bg-primary 
        p-[12px] shadow-lg transition
        group
      '
      aria-label='Scroll to top'
    >
      <NextIcon className='w-[30px] h-[30px] rotate-[-90deg] text-white group-hover:text-white' />
    </button>
  );
}
