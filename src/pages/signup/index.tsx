import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

import FormInput from "@/components/common/FormInput";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
  emailSchema,
  nicknameSchema,
  passwordSchema,
  passwordCheckSchema,
} from "@/lib/form/schemas";

const SignupSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    passwordCheck: passwordCheckSchema,
  })
  .refine((formData) => formData["password"] === formData["passwordCheck"], {
    path: ["password-check"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type SignupData = z.infer<typeof SignupSchema>;

const Signup = () => {
  // 회원가입 스키마

  const methods = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
  });

  const handleOnClickSignup: SubmitHandler<SignupData> = (formData) => {
    console.log("폼 데이터 제출 시 동작");
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-[21rem] min-h-[43rem] md:w-[31rem] md:min-h-[48rem] lg:min-h-[50rem] py-14 px-5 md:py-16 md:px-12 lg:py-12 lg:px-20 flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]">
        <div className="w-[104px] h-[30px] mb-[56px] md:mb-[64px]">
          <Logo className="text-black" />
        </div>
        {/* 폼 시작 */}
        <FormProvider {...methods}>
          <form
            className="flex flex-col items-center gap-4 md:gap-6"
            onSubmit={methods.handleSubmit(handleOnClickSignup)}
          >
            {/* 이메일 */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="email">이메일</label>
              <FormInput
                type="email"
                id="email"
                name="email"
                placeholder="user@email.com"
              />
            </div>
            {/* 닉네임 */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="nickname">닉네임</label>
              <FormInput
                type="text"
                id="nickname"
                name="nickname"
                placeholder="user"
              />
            </div>
            {/* 비밀번호 */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="password">비밀번호</label>
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
              />
            </div>
            {/* 비밀번호 확인 */}
            <div className="flex flex-col gap-2.5">
              <label htmlFor="user-email">비밀번호 확인</label>
              <FormInput
                type="password"
                id="passwordCheck"
                name="passwordCheck"
                placeholder="비밀번호 확인"
              />
            </div>
            <Button
              variant="purpleDark"
              size="md"
              width="md"
              className="text-lg font-bold mb-10"
              disabled={!methods.formState.isValid}
            >
              가입하기
            </Button>
          </form>
        </FormProvider>
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
