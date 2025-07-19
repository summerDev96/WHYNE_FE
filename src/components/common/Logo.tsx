import React from 'react';
import LogoIcon from '@/assets/logo.svg';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" className='w-[52px] h-[15px]'>
      <LogoIcon />
    </Link>
  );
}

export default Logo;
