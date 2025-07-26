import React, { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getUser } from '@/api/user';
import { cn } from '@/lib/utils';
import { GetUserResponse } from '@/types/UserTypes';

import MenuDropdown from './dropdown/MenuDropdown';
import Logo from './Logo';
import UserDefaultImg from './UserDefaultImg';

function Gnb() {
  const { pathname } = useRouter();
  const isLanding = pathname === '/';

  return (
    <div className='z-50 fixed top-0 inset-x-0'>
      <div
        className={cn('absolute inset-0 h-12 backdrop-blur-[2px] bg-white/60', {
          'bg-gray-100/60': isLanding,
        })}
      />
      <div
        className={cn('absolute inset-0 bg-gradient-to-b from-white/80 to-transparent', {
          'bg-gray/60': isLanding,
        })}
      />

      <header className='relative z-10 mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px] min-w-[343px]'>
        <nav className='flex justify-between items-center bg-black w-full h-[50px] md:h-[70px] rounded-[12px] md:rounded-[16px] mt-[16px] md:mt-[24px] px-[20px] md:px-[60px]'>
          <Logo />
          <AuthMenu />
        </nav>
      </header>
    </div>
  );
}

export default Gnb;

function AuthMenu() {
  const { pathname } = useRouter();

  const hasAccessToken =
    typeof window === 'undefined' ? false : !!localStorage.getItem('accessToken');

  //아이디:abc@123.com 비번:12345678
  const { data: user, isError } = useQuery<GetUserResponse>({
    queryKey: ['currentUser'],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    retry: false,
    enabled: hasAccessToken, //로컬스토리지에 엑세스 토큰 있을 때만 요청 보내서 유효한 토큰인지 확인해봐
  });

  useEffect(() => {
    if (isError) alert('사용자 정보를 불러오지 못했습니다. 다시 로그인 해주세요.');
  }, [isError]); //요청 자체가 실패했을 때만 //초기 마운트 시에는 false일테니 if문에서 거르기

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
  userImage: string;
}

function UserDropdown({ userImage }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  function onSelect(value: string) {
    if (value === 'mypage') router.push('/mypage');
    if (value === 'logout') handleLogout();
  }

  function handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    queryClient.removeQueries({ queryKey: ['currentUser'] });
    //-> removeQueries vs invalidateQueries :리무브는 아예 삭제 인밸리데이트는 stale상태로
    router.push('/');
  }

  return (
    <MenuDropdown
      options={[
        { label: '마이페이지', value: 'mypage' },
        { label: '로그아웃', value: 'logout' },
      ]}
      onSelect={onSelect}
      trigger={
        <div className='w-[20px] md:w-[45px] h-[20px] md:h-[45px] cursor-pointer'>
          {userImage ? <Image src={userImage} alt='유저의 프로필 사진' /> : <UserDefaultImg />}
        </div>
      }
    ></MenuDropdown>
  );
}
