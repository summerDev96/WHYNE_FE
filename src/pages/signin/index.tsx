import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

import KakaoIcon from '@/assets/icons/kakao.svg';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthLogo from '@/components/auth/AuthLogo';
import FormInput from '@/components/common/FormInput';
import ErrorModal from '@/components/common/Modal/ErrorModal';
import { Button } from '@/components/ui/button';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import useErrorModal from '@/hooks/useErrorModal';
import { emailSchema, passwordSchema } from '@/lib/form/schemas';
import { LoginRequest, LoginResponse } from '@/types/AuthTypes';

import { loginUser } from '../../api/auth';

const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginData = z.infer<typeof LoginSchema>;

const SignIn = () => {
  const { open, setOpen, handleError, errorMessage } = useErrorModal();
  const { userData, isLoading } = useAuthRedirect();
  const router = useRouter();

  const methods = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: 'all',
  });

  const {
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isValid },
  } = methods;

  const loginMutation = useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        // 로그인 오류인 경우 공통 에러 메시지
        setError('root', { message: '이메일 혹은 비밀번호를 확인해주세요' });
      } else {
        // API 에러를 모달로 출력
        handleError(error.response?.data as Error);
      }
    },
  });

  const handleOnClickLogin: SubmitHandler<LoginData> = (formData) => {
    loginMutation.mutate(formData);
  };

  const handleOnClickKakao = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    // 카카오 로그인 화면으로 이동
    window.location.href = kakaoAuthUrl;
  };

  /* useAuthRedirect 훅에서 유저 데이터 요청 후 리디렉트 처리 */
  // 로딩중이거나 데이터 없으면 화면 안보이게 처리
  if (isLoading || userData) return null;

  return (
    <AuthLayout className='min-h-[40rem] md:min-h-[46rem] lg:min-h-[48rem]'>
      <ErrorModal open={open} onOpenChange={setOpen} errorMessage={errorMessage} />

      <AuthLogo />
      {/* 폼 시작 */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOnClickLogin)}>
          <div className='flex flex-col items-center gap-4 md:gap-9'>
            {/* 이메일 */}
            <div className='flex flex-col gap-2.5'>
              <label htmlFor='email'>이메일</label>
              <FormInput
                type='email'
                id='email'
                name='email'
                placeholder='user@email.com'
                onChange={() => {
                  clearErrors('root');
                }}
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
                  clearErrors('root');
                }}
              />
            </div>
          </div>

          {/* 로그인 오류 출력 */}
          {errors.root && <p className='text-red-500 flex self-start'>{errors.root.message}</p>}

          <div className='flex flex-col mb-10 gap-4'>
            <Button
              variant='purpleDark'
              size='md'
              width='md'
              className='text-lg font-bold mt-10'
              disabled={!isValid}
            >
              로그인
            </Button>
            <Button
              type='button'
              size='md'
              width='md'
              className='text-lg font-bold border-none bg-kakaoYellow'
              onClick={handleOnClickKakao}
            >
              <div className='[&_svg]:w-5 [&_svg]:h-5 flex gap-3 items-center'>
                <KakaoIcon /> 카카오로그인
              </div>
            </Button>
          </div>
        </form>
      </FormProvider>
      <span className='text-gray-500'>
        계정이 없으신가요?{' '}
        <Link href='/signup' className='text-purpleDark font-medium underline'>
          회원가입하기
        </Link>
      </span>
    </AuthLayout>
  );
};

export default SignIn;
