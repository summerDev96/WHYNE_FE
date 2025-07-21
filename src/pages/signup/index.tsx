import React from "react";

import Link from "next/link";

import Input from "@/components/common/Input";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const handleOnClickSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 시 새로고침 막음
    console.log("회원가입 버튼 클릭 시 동작");
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-[343px] md:w-[496px] my-[138px] py-[56px] px-[20px] md:py-[64px] md:px-[48px] lg:py-[80px] lg:px-[48px] flex flex-col items-center rounded-2xl bg-white border border-gray-300 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]">
        <div className="w-[104px] h-[30px] mb-[56px] md:mb-[64px]">
          <Logo className="text-black" />
        </div>
        {/* 폼 시작 */}
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleOnClickSignup}
        >
          {/* 이메일 */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="user-email">이메일</label>
            <Input type={undefined} id={""} placeholder="user@email.com" />
          </div>
          {/* 닉네임 */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="user-email">닉네임</label>
            <Input type={undefined} id={""} placeholder="user" />
          </div>
          {/* 비밀번호 */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="user-email">비밀번호</label>
            <Input
              type={undefined}
              id={""}
              placeholder="영문, 숫자, 특수문자(!@#$%^&*)  제한"
            />
          </div>
          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="user-email">비밀번호 확인</label>
            <Input type={undefined} id={""} placeholder="비밀번호 확인" />
          </div>
          <Button
            variant="purpleDark"
            size="md"
            width="md"
            className="text-lg font-bold mb-10"
          >
            가입하기
          </Button>
        </form>
        <span className="text-gray-500">
          계정이 이미 있으신가요?{" "}
          <Link href="/login" className="text-purpleDark font-medium underline">
            로그인하기
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
