import React from 'react';

import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children?: React.ReactNode;
  className?: string;
}
const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  const bgClass = 'flex justify-center items-center bg-gray-100 min-h-screen';
  const cardClass = cn(
    'w-full max-w-[21rem] md:max-w-[31rem] py-14 px-5 md:py-16 md:px-12 lg:py-20 flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]',
    className,
  );

  return (
    <div className={bgClass}>
      <div className={cardClass}>{children}</div>
    </div>
  );
};

export default AuthLayout;
