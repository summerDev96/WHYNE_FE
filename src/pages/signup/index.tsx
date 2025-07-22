import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

import FormInput from "@/components/common/FormInput";
import Logo from "@/components/common/Logo";
import ConfirmModal from "@/components/common/Modal/ConfirmModal";
import { Button } from "@/components/ui/button";
import {
  emailSchema,
  nicknameSchema,
  passwordSchema,
  passwordConfirmationSchema,
} from "@/lib/form/schemas";
import { LoginRequest, SignupRequest, SignupResponse } from "@/types/AuthTypes";

import { userLogin, userRegister } from "../api/auth";

// import { createUser } from "../api/auth";

const SignupSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine(
    (formData) => formData["password"] === formData["passwordConfirmation"],
    {
      path: ["password-check"],
      message: "비밀번호가 일치하지 않습니다.",
    }
  );

type SignupData = z.infer<typeof SignupSchema>;

const Signup = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const methods = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
  });

  const signup = async (params: SignupRequest): Promise<SignupResponse> => {
    return await userRegister(params);
  };

  const mutation = useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signup,
    onSuccess: (data, variables) => {
      console.log("회원가입 성공", data);
      console.log("request 요청 시 formData", variables);
      // const { email, password } = variables;
      login();
    },
    onError: (error) => {
      // API 에러를 모달로 출력
      setErrorMsg(error.message);
      setShowModal(true);
    },
  });

  const handleOnClickSignup: SubmitHandler<SignupData> = (formData) => {
    console.log(formData);
    mutation.mutate(formData);
  };

  const login = async () => {
    await userLogin({
      email: "belly15@naver.com",
      password: "12345678",
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-[21rem] min-h-[43rem] md:w-[31rem] md:min-h-[48rem] lg:min-h-[50rem] py-14 px-5 md:py-16 md:px-12 lg:py-12 lg:px-20 flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]">
        {/* 모달 컴포넌트 */}
        <ConfirmModal
          open={showModal}
          onOpenChange={setShowModal}
          /* 버튼커스텀 영역 */
          buttons={
            <>
              <Button
                size="xl"
                width="xl"
                variant="purpleDark"
                className="flex-auto text-base font-bold"
                onClick={() => setShowModal(false)}
              >
                확인
              </Button>
            </>
          }
        >
          {/* 모달 내용 영역 */}
          {errorMsg}
        </ConfirmModal>
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
              <label htmlFor="passwordConfirmation">비밀번호 확인</label>
              <FormInput
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
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
