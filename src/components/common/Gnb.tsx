import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import UserDefaultImg from './UserDefaultImg';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Gnb() {
  return (
    <header className="mx-auto px-[16px] md:px-[20px] xl:px-0 max-w-[1140px]  min-w-[343px]">
      <nav className=" z-50 flex justify-between items-center bg-black  w-full h-[50px] md:h-[70px] rounded-[12px] md:rounded-[16px] mt-[16px] md:mt-[24px] px-[20px] md:px-[60px]">
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
  /* */

  return user ? (
    <UserDropdown userImage={''} />
  ) : (
    <div className="flex items-center gap-[20px] md:gap-[40px] text-white text-[14px] md:text-[16px] font-medium">
      <Link href="/login">로그인</Link>
      {pathname === '/' && <Link href="/signup">회원가입</Link>}
    </div>
  );
}

interface Props {
  userImage: string;
}

function UserDropdown({ userImage }: Props) {
  //UserDefaultImg컴포넌트 안에서 분기 나누면 보기가 더 깔끔했을 것 같은데
  //UserDefaultImg를 따로 재사용할 일이 있을 것 같아서(ex 마이페이지)
  // 분리해두고 여기서 분기 나누게 되었습니다.

  return (
    <>
      {/*빈 프래그먼트 대신 공통 드랍다운 태그 넣을겁니다 차일드가 트리거가 될 수 있게*/}
      <div className="w-[20px] md:w-[45px] h-[20px] md:h-[45px]">
        {userImage ? (
          <Image src={userImage} alt="유저의 프로필 사진" />
        ) : (
          <UserDefaultImg />
        )}
      </div>
    </>
  );
}
