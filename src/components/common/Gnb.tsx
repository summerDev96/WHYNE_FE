import React from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import apiClient from '@/api/apiClient';
import { getUser } from '@/api/user';
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

export function AuthMenu() {
  const { pathname } = useRouter();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['nowLoginUser'],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return;

  if (isError)
    return (
      <div className='flex items-center gap-[20px] md:gap-[40px] text-white md:text-[16px] custom-text-md-medium font-sans'>
        <Link href='/signin'>로그인</Link>
        {pathname === '/' && <Link href='/signup'>회원가입</Link>}
      </div>
    );

  if (!user) return;
  return <UserDropdown userImage={user.image} />;
}

interface Props {
  userImage: string | null;
}

function UserDropdown({ userImage }: Props) {
  const router = useRouter();
  const { clearUser } = useUser();
  const queryClient = useQueryClient();

  function onSelect(value: string) {
    if (value === 'myprofile') router.push('/my-profile');
    if (value === 'logout') handleLogout();
  }

  async function handleLogout() {
    queryClient.removeQueries({ queryKey: ['nowLoginUser'] });
    //쿠키 만료시키기
    await apiClient.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`);
    clearUser();
    if (router.pathname !== '/my-profile') {
      router.push('/');
    }
  }

  return (
    <MenuDropdown
      options={[
        { label: '마이페이지', value: 'myprofile' },
        { label: '로그아웃', value: 'logout' },
      ]}
      onSelect={onSelect}
      trigger={
        <div className='relative w-[20px] md:w-[45px] h-[20px] md:h-[45px] cursor-pointer rounded-full overflow-hidden'>
          {userImage ? (
            <Image fill style={{ objectFit: 'cover' }} src={userImage} alt='유저의 프로필 사진' />
          ) : (
            <UserDefaultImg />
          )}
        </div>
      }
    ></MenuDropdown>
  );
}
