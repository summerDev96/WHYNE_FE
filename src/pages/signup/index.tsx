import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

import { createUser, loginUser } from '@/api/auth';
import { getUser } from '@/api/user';
import FormInput from '@/components/common/FormInput';
import Logo from '@/components/common/Logo';
import ConfirmModal from '@/components/common/Modal/ConfirmModal';
import { Button } from '@/components/ui/button';
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
  const router = useRouter();

  const bgClass = 'flex justify-center items-center bg-gray-100 min-h-screen';
  const cardClass =
    'min-h-[43rem] md:min-h-[48rem] lg:min-h-[50rem] w-full max-w-[21rem] md:max-w-[31rem] py-14 px-5 md:py-16 md:px-12 lg:py-20 flex flex-col items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]';

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleRegister = async (params: SignupRequest): Promise<SignupResponse> => {
    return await createUser(params);
  };

  const handleLogin = async (params: LoginRequest): Promise<LoginResponse> => {
    return await loginUser(params);
  };

  // 에러 처리: 모달로 메시지 출력
  const handleError = (error: Error) => {
    setErrorMsg(error.message);
    setShowModal(true);
  };

  const registerMutation = useMutation<SignupResponse, AxiosError, SignupRequest>({
    mutationFn: handleRegister,
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
    mutationFn: handleLogin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
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
          <form onSubmit={handleSubmit(handleOnClickSignup)}>
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
              {/* 닉네임 */}
              <div className='flex flex-col gap-2.5'>
                <label htmlFor='nickname'>닉네임</label>
                <FormInput
                  type='text'
                  id='nickname'
                  name='nickname'
                  placeholder='user'
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
                    // 하지만 여기서 간단하게 passwordConfirmation 필드에 값이 있는지만 체크하려면:
                    if (getValues('passwordConfirmation')) {
                      trigger('passwordConfirmation');
                    }
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
                  onChange={() => {
                    clearErrors('root');
                  }}
                />
              </div>
            </div>

            {/* 회원가입 오류 출력 */}
            {errors.root && <p className='text-red-500 flex self-start'>{errors.root.message}</p>}
            <Button
              variant='purpleDark'
              size='md'
              width='md'
              className='text-lg font-bold mb-10 mt-8'
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
      </div>
    </div>
  );
};

export default Signup;
