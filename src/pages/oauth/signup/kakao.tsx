import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { signInKakao } from '@/api/auth';
import { getUser } from '@/api/user';
import ErrorModal from '@/components/common/Modal/ErrorModal';
import useErrorModal from '@/hooks/useErrorModal';
import { useUser } from '@/hooks/useUser';
import { KakakoSignInRequest, KakakoSignInResponse } from '@/types/AuthTypes';

/* 카카오 로그인 버튼 클릭 시 API 호출하여 로그인/회원가입 처리 */
const KakaoLoginCallbackPage = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const { code } = router.query;

  const { open, setOpen, handleError, errorMessage } = useErrorModal();

  /* 카카오 회원가입/로그인 요청 */
  const handleKakaoAuth = async (): Promise<KakakoSignInResponse> => {
    const params: KakakoSignInRequest = {
      state: '',
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? '',
      token: code as string,
    };
    return await signInKakao(params);
  };

  const { data, error } = useQuery({
    queryKey: ['handleKakaoAuth'],
    queryFn: handleKakaoAuth,
    enabled: typeof code === 'string',
    retry: false,
  });

  const { refetch: userRefecth } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (!data) return;

    /* API 성공 시 전역 유저 데이터 세팅 */
    const setUserData = async () => {
      try {
        const { data: userData } = await userRefecth();
        if (!userData) return;

        setUser(userData);
        router.push('/');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // 유저 정보 API 에러를 모달로 출력
          handleError(error.response?.data as Error);
        }
      }
    };

    setUserData();
  }, [data, router, setUser, userRefecth, handleError]);

  useEffect(() => {
    /* 카카오 API 에러 시 모달로 에러 출력 */
    if (error) {
      handleError(new Error('카카오 로그인을 재시도해주세요'));
    }
  }, [error, handleError]);

  return (
    /* 에러 모달에서 확인 버튼 클릭 시 로그인 화면으로 리디렉트 처리 */
    <ErrorModal open={open} onOpenChange={setOpen} onConfirm={() => router.replace('/signin')}>
      {errorMessage}
    </ErrorModal>
  );
};

export default KakaoLoginCallbackPage;
