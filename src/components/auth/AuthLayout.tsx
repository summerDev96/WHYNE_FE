import React from 'react';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';

const MasonryGrid = dynamic(() => import('@/components/auth/MasonryGrid'), { ssr: false });

interface AuthLayoutProps {
  children?: React.ReactNode;
  className?: string;
}
const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  const wineImages = [
    '/assets/wine1.jpg',
    '/assets/wine2.jpg',
    '/assets/wine3.jpg',
    '/assets/wine4.jpg',
    '/assets/wine5.jpg',
    '/assets/wine6.jpg',
    '/assets/wine7.jpg',
    '/assets/wine8.jpg',
    '/assets/wine9.jpg',
    '/assets/wine10.jpg',
    '/assets/wine11.jpg',
    '/assets/wine12.jpg',
    '/assets/wine13.jpg',
    '/assets/wine14.jpg',
    '/assets/wine15.jpg',
    '/assets/wine16.jpg',
    '/assets/wine17.jpg',
    '/assets/wine18.jpg',
    '/assets/wine19.jpg',
  ];

  const bgClass = 'relative flex justify-center items-center min-h-screen';
  const cardClass = cn(
    'w-full max-w-[21rem] md:max-w-[31rem] py-14 px-5 md:py-16 md:px-12 lg:py-20 flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]',
    className,
  );

  return (
    <div className={bgClass}>
      <div className={cardClass}>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]'>
          <div className='relative w-full h-full'>
            <div className='absolute inset-0 bg-black/50 z-10' />
            <div className='relative z-0'>
              <MasonryGrid images={wineImages} />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
