import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

import { getUser } from '@/api/user';
import KakaoIcon from '@/assets/icons/kakao.svg';
import FormInput from '@/components/common/FormInput';
import Logo from '@/components/common/Logo';
import ErrorModal from '@/components/common/Modal/ErrorModal';
import { Button } from '@/components/ui/button';
import { emailSchema, passwordSchema } from '@/lib/form/schemas';
import { LoginRequest, LoginResponse } from '@/types/AuthTypes';

import { loginUser } from '../../api/auth';

const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginData = z.infer<typeof LoginSchema>;

const SignIn = () => {
  const router = useRouter();

  const bgClass = 'flex justify-center items-center bg-gray-100 min-h-screen';
  const cardClass =
    'min-h-[40rem] md:min-h-[46rem] lg:min-h-[48rem] w-full max-w-[21rem] md:max-w-[31rem] py-14 px-5 md:py-16 md:px-12 lg:py-20 flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]';

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleLogin = async (params: LoginRequest): Promise<LoginResponse> => {
    return await loginUser(params);
  };

  // 에러 처리: 모달로 메시지 출력
  const handleError = (error: Error) => {
    setErrorMsg(error.message);
    setShowModal(true);
  };

  const loginMutation = useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
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

  const { data: userData, isLoading } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
    retry: false,
  });

  useEffect(() => {
    if (userData) {
      router.replace('/');
    }
  }, [userData, router]);

  if (isLoading || userData) return null;

  return (
    <div className={bgClass}>
      <div className={cardClass}>
        <ErrorModal open={showModal} onOpenChange={setShowModal} errorMessage={errorMsg} />
        <div className='w-[104px] h-[30px] mb-[56px] md:mb-[64px]'>
          <Logo className='text-black' />
        </div>
        {/* 폼 시작 */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleOnClickLogin)}>
            <div className='flex flex-col items-center gap-4 md:gap-6'>
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
                className='text-lg font-bold mt-8'
                disabled={!isValid}
              >
                로그인
              </Button>
              <Button
                asChild
                type='button'
                size='md'
                width='md'
                className='text-lg font-bold'
                onClick={handleOnClickKakao}
              >
                <div className='[&_svg]:w-6 [&_svg]:h-6'>
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
      </div>
    </div>
  );
};

export default SignIn;
