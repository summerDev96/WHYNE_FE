import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

import FormInput from '@/components/common/FormInput';
import Logo from '@/components/common/Logo';
import ConfirmModal from '@/components/common/Modal/ConfirmModal';
import { Button } from '@/components/ui/button';
import { emailSchema, passwordSchema } from '@/lib/form/schemas';
import { LoginRequest, LoginResponse } from '@/types/AuthTypes';

import { userLogin } from '../../api/auth';

const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginData = z.infer<typeof LoginSchema>;

const SignIn = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: 'all',
  });

  const loginUser = async (params: LoginRequest): Promise<LoginResponse> => {
    return await userLogin(params);
  };

  // 에러 처리: 모달로 메시지 출력
  const handleError = (error: Error) => {
    setErrorMsg(error.message);
    setShowModal(true);
  };

  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('로그인 성공', data);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/');
    },
    onError: (error) => {
      // API 에러를 모달로 출력
      handleError(error);
    },
  });

  const handleOnClickLogin: SubmitHandler<LoginData> = (formData) => {
    console.log(formData);
    loginMutation.mutate(formData);
  };

  return (
    <div className='flex justify-center items-center bg-gray-100 min-h-screen'>
      <div className='w-[21rem] min-h-[43rem] md:w-[31rem] md:min-h-[48rem] lg:min-h-[50rem] py-14 px-5 md:py-16 md:px-12 lg:py-12 lg:px-20 flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]'>
        {/* 모달 컴포넌트 */}
        <ConfirmModal
          open={showModal}
          onOpenChange={setShowModal}
          /* 버튼커스텀 영역 */
          buttons={
            <>
              <Button
                size='xl'
                width='xl'
                variant='purpleDark'
                className='flex-auto text-base font-bold'
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
        <div className='w-[104px] h-[30px] mb-[56px] md:mb-[64px]'>
          <Logo className='text-black' />
        </div>
        {/* 폼 시작 */}
        <FormProvider {...methods}>
          <form
            className='flex flex-col items-center gap-4 md:gap-6'
            onSubmit={methods.handleSubmit(handleOnClickLogin)}
          >
            {/* 이메일 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='email'>이메일</label>
              <FormInput type='email' id='email' name='email' placeholder='user@email.com' />
            </div>
            {/* 비밀번호 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='password'>비밀번호</label>
              <FormInput
                type='password'
                id='password'
                name='password'
                placeholder='영문, 숫자, 특수문자(!@#$%^&*) 제한'
              />
            </div>
            <Button
              variant='purpleDark'
              size='md'
              width='md'
              className='text-lg font-bold mb-10'
              disabled={!methods.formState.isValid}
            >
              로그인
            </Button>
          </form>
        </FormProvider>
        <span className='text-gray-500'>
          계정이 없으신가요?{' '}
          <Link href='/signup' className='text-purpleDark font-medium underline'>
            회원가입하기
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
