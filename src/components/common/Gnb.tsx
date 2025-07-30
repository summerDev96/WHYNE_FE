import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import apiClient from '@/api/apiClient';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';

import MenuDropdown from './dropdown/MenuDropdown';
import Logo from './Logo';
import UserDefaultImg from './UserDefaultImg';

function Gnb() {
  return (
    <div className='z-50 fixed top-0 inset-x-0'>
      {/* Header 부분 (상단 여백 + GNB) */}
      <header className='relative z-10 mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px] min-w-[343px]'>
        <nav className='flex justify-between items-center bg-black w-full h-[50px] md:h-[70px] rounded-[12px] md:rounded-[16px] mt-[16px] md:mt-[24px] px-[20px] md:px-[60px]'>
          <Logo />
          <AuthMenu />
        </nav>
      </header>

      {/* 블러 처리 및 마스크 적용 (Tailwind arbitrary properties) */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[94px] backdrop-blur-[2px] pointer-events-none',
          '[mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)]',
          '[-webkit-mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)]',
        )}
      />
    </div>
  );
}

export default Gnb;

function AuthMenu() {
  const { pathname } = useRouter();
  const { user } = useUser();

  return user ? (
    <UserDropdown userImage={user.image} />
  ) : (
    <div className='flex items-center gap-[20px] md:gap-[40px] text-white md:text-[16px] custom-text-md-medium font-sans'>
      <Link href='/signin'>로그인</Link>
      {pathname === '/' && <Link href='/signup'>회원가입</Link>}
    </div>
  );
}

interface Props {
  userImage: string | null;
}

function UserDropdown({ userImage }: Props) {
  const router = useRouter();

  function onSelect(value: string) {
    if (value === 'myprofile') router.push('/my-profile');
    if (value === 'logout') handleLogout();
  }

  const { clearUser } = useUser();

  async function handleLogout() {
    await apiClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`);
    clearUser();
    router.push('/');
  }

  return (
    <MenuDropdown
      options={[
        { label: '마이페이지', value: 'myprofile' },
        { label: '로그아웃', value: 'logout' },
      ]}
      onSelect={onSelect}
      trigger={
        <div className='relative w-[20px] md:w-[45px] h-[20px] md:h-[45px] cursor-pointer'>
          {userImage ? <Image fill src={userImage} alt='유저의 프로필 사진' /> : <UserDefaultImg />}
        </div>
      }
    ></MenuDropdown>
  );
}
