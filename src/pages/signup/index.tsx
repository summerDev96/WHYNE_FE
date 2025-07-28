import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

import { createUser, loginUser } from '@/api/auth';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthLogo from '@/components/auth/AuthLogo';
import FormInput from '@/components/common/FormInput';
import ErrorModal from '@/components/common/Modal/ErrorModal';
import { Button } from '@/components/ui/button';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import useErrorModal from '@/hooks/useErrorModal';
import { setAuthCookiesWithCallback } from '@/lib/cookie';
import {
  emailSchema,
  nicknameSchema,
  passwordSchema,
  passwordConfirmationSchema,
} from '@/lib/form/schemas';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/AuthTypes';

const SignupSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine((formData) => formData['password'] === formData['passwordConfirmation'], {
    path: ['passwordConfirmation'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type SignupData = z.infer<typeof SignupSchema>;

const Signup = () => {
  const { open, setOpen, handleError, errorMessage } = useErrorModal();
  const { userData, isLoading } = useAuthRedirect();
  const router = useRouter();

  const methods = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    mode: 'all',
  });

  const {
    handleSubmit,
    clearErrors,
    setError,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = methods;

  const registerMutation = useMutation<SignupResponse, AxiosError, SignupRequest>({
    mutationFn: createUser,
    onSuccess: (_, variables) => {
      const { email, password } = variables;
      loginMutation.mutate({ email, password });
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        // 로그인 오류인 경우 공통 에러 메시지
        setError('root', { message: '닉네임이 중복되었습니다.' });
      } else {
        // API 에러를 모달로 출력
        handleError(error.response?.data as Error);
      }
    },
  });

  const loginMutation = useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      /* 로그인 후 로컬스토리지 토큰 저장 */
      setAuthCookiesWithCallback({ accessToken, refreshToken, callback: () => router.push('/') });
    },
    onError: (error) => {
      // API 에러를 모달로 출력
      handleError(error.response?.data as Error);
    },
  });

  const handleOnClickSignup: SubmitHandler<SignupData> = (formData) => {
    registerMutation.mutate(formData);
  };

  /* 공통 에러가 이미 있는 경우, 인풋 입력 시 초기화 하는 메소드  */
  const resetCommonErrorMessage = () => {
    if (errors.root) clearErrors('root');
  };

  /* 비밀번호 확인 값 입력 시, 비밀번호 확인 값을 유효성 체크하도록 함 */
  const validatePasswordConfirmation = () => {
    if (getValues('passwordConfirmation')) {
      trigger('passwordConfirmation');
    }
  };

  /* useAuthRedirect 훅에서 유저 데이터 요청 후 리디렉트 처리 */
  // 로딩중이거나 데이터 없으면 화면 안보이게 처리
  if (isLoading || userData) return null;

  return (
    <AuthLayout className='min-h-[43rem] md:min-h-[48rem] lg:min-h-[50rem]'>
      <ErrorModal open={open} onOpenChange={setOpen}>
        {errorMessage}
      </ErrorModal>

      <AuthLogo />
      {/* 폼 시작 */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOnClickSignup)}>
          <div className='flex flex-col items-center gap-4 md:gap-9'>
            {/* 이메일 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='email'>이메일</label>
              <FormInput
                type='email'
                id='email'
                name='email'
                placeholder='user@email.com'
                onChange={resetCommonErrorMessage}
              />
            </div>
            {/* 닉네임 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='nickname'>닉네임</label>
              <FormInput
                type='text'
                id='nickname'
                name='nickname'
                placeholder='user'
                onChange={resetCommonErrorMessage}
              />
            </div>
            {/* 비밀번호 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='password'>비밀번호</label>
              <FormInput
                type='password'
                id='password'
                name='password'
                placeholder='영문, 숫자, 특수문자(!@#$%^&*) 제한'
                onChange={() => {
                  resetCommonErrorMessage();
                  /* 비밀번호 확인 값이 있으면 유효성 체크하도록 함 */
                  validatePasswordConfirmation();
                }}
              />
            </div>
            {/* 비밀번호 확인 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='passwordConfirmation'>비밀번호 확인</label>
              <FormInput
                type='password'
                id='passwordConfirmation'
                name='passwordConfirmation'
                placeholder='비밀번호 확인'
                onChange={resetCommonErrorMessage}
              />
            </div>
          </div>

          {/* 회원가입 오류 출력 */}
          {errors.root && <p className='text-red-500 flex self-start'>{errors.root.message}</p>}
          <Button
            variant='purpleDark'
            size='md'
            width='md'
            className='text-lg font-bold mb-10 mt-10'
            disabled={!isValid}
          >
            가입하기
          </Button>
        </form>
      </FormProvider>
      <span className='text-gray-500'>
        계정이 이미 있으신가요?{' '}
        <Link href='/signin' className='text-purpleDark font-medium underline'>
          로그인하기
        </Link>
      </span>
    </AuthLayout>
  );
};

export default Signup;
