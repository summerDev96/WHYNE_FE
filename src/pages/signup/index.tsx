import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

import { createUser, loginUser } from '@/api/auth';
import { getUser } from '@/api/user';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthLogo from '@/components/auth/AuthLogo';
import FormInput from '@/components/common/FormInput';
import ErrorModal from '@/components/common/Modal/ErrorModal';
import { Button } from '@/components/ui/button';
import useErrorModal from '@/hooks/useErrorModal';
import useTokenCheckRedirect from '@/hooks/useTokenCheckRedirect';
import { useUser } from '@/hooks/useUser';
import {
  emailSchema,
  nicknameSchema,
  passwordSchema,
  passwordConfirmationSchema,
} from '@/lib/form/schemas';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/AuthTypes';
import { GetUserResponse } from '@/types/UserTypes';

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
  const { setUser } = useUser();
  const { open, setOpen, handleError, errorMessage } = useErrorModal();
  const { isLoading } = useTokenCheckRedirect();
  const router = useRouter();

  const methods = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    mode: 'all',
  });

  const {
    handleSubmit,
    setError,
    trigger,
    getValues,
    formState: { isValid },
  } = methods;

  const registerMutation = useMutation<SignupResponse, AxiosError, SignupRequest>({
    mutationFn: createUser,
    onSuccess: (_, variables) => {
      const { email, password } = variables;
      loginMutation.mutate({ email, password });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      const status = err.response?.status;
      const message = err.response?.data?.message;

      switch (status) {
        case 400:
          setError('email', { message });
          break;
        case 500:
          setError('nickname', { message: '닉네임이 중복되었습니다.' });
          break;
        default:
          handleError(error.response?.data as Error);
      }
    },
  });

  const loginMutation = useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: () => {
      userMutation.mutate();
    },
    onError: (error) => {
      // API 에러를 모달로 출력
      handleError(error.response?.data as Error);
    },
  });

  const userMutation = useMutation<GetUserResponse, AxiosError>({
    mutationFn: getUser,
    onSuccess: (data) => {
      setUser(data);
      router.push('/');
    },
    onError: (error) => {
      // API 에러를 모달로 출력
      handleError(error.response?.data as Error);
    },
  });

  const handleOnClickSignup: SubmitHandler<SignupData> = (formData) => {
    registerMutation.mutate(formData);
  };

  /* 비밀번호 확인 값 입력 시, 비밀번호 확인 값을 유효성 체크하도록 함 */
  const validatePasswordConfirmation = () => {
    if (getValues('passwordConfirmation')) {
      trigger('passwordConfirmation');
    }
  };

  /* useTokenCheckRedirect 훅에서 유저 데이터 요청 후 리디렉트 처리 */
  // 로딩중이거나 데이터 없으면 화면 안보이게 처리
  if (isLoading) return null;

  return (
    <AuthLayout className='min-h-[43rem] md:min-h-[48rem] lg:min-h-[50rem]'>
      <ErrorModal open={open} onOpenChange={setOpen}>
        {errorMessage}
      </ErrorModal>

      <AuthLogo />
      {/* 폼 시작 */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOnClickSignup)}>
          <div className='flex flex-col items-center gap-9 md:gap-9'>
            {/* 이메일 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='email'>이메일</label>
              <FormInput type='email' id='email' name='email' placeholder='user@email.com' />
            </div>
            {/* 닉네임 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='nickname'>닉네임</label>
              <FormInput type='text' id='nickname' name='nickname' placeholder='user' />
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
              />
            </div>
          </div>

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
