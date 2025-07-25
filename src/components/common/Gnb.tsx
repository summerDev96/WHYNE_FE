import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MenuDropdown from './dropdown/MenuDropdown';
import Logo from './Logo';
import UserDefaultImg from './UserDefaultImg';

function Gnb() {
  return (
    //inset-x-0 -> x축:left,right둘 다 0
    <header className='z-50 fixed top-0 inset-x-0 mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px]'>
      <nav className='flex justify-between items-center bg-black  w-full h-[50px] md:h-[70px] rounded-[12px] md:rounded-[16px] mt-[16px] md:mt-[24px] px-[20px] md:px-[60px]'>
        <Logo />
        <AuthMenu />
      </nav>
    </header>
  );
}

export default Gnb;

function AuthMenu() {
  const { pathname } = useRouter();
  // const { user } = useAuth();

  /*테스트용 코드*/
  let user = null; //로그인x상태
  user = { image: '' }; //로그인o 상태 //여기 주석 풀었다 했다하면서 확인할 수 있어여
  /*        */

  return user ? (
    <UserDropdown userImage={''} />
  ) : (
    <div className='flex items-center gap-[20px] md:gap-[40px] text-white md:text-[16px] custom-text-md-medium font-sans'>
      <Link href='/login'>로그인</Link>
      {pathname === '/' && <Link href='/signup'>회원가입</Link>}
    </div>
  );
}

interface Props {
  userImage: string;
}

function UserDropdown({ userImage }: Props) {
  const router = useRouter();

  function onSelect(value: string) {
    if (value === 'mypage') router.push('/mypage');
    if (value === 'logout') alert('스토리지에 있는 엑세스토큰 삭제');
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
