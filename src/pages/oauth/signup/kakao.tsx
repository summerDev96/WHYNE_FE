import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { signInKakao } from '@/api/auth';
import ErrorModal from '@/components/common/Modal/ErrorModal';
import useErrorModal from '@/hooks/useErrorModal';
import { KakakoSignInRequest, KakakoSignInResponse } from '@/types/AuthTypes';

/* 카카오 로그인 버튼 클릭 시 API 호출하여 로그인/회원가입 처리 */
const KakaoLoginCallbackPage = () => {
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

  useEffect(() => {
    /* API 에러 시 모달로 에러 출력 */
    if (error) {
      handleError(new Error('카카오 로그인을 재시도해주세요'));
    }

    /* API 성공 시 로그인 처리 */
    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.replace('/');
    }
  }, [data, error, router, code, handleError]);

  return (
    /* 에러 모달에서 확인 버튼 클릭 시 로그인 화면으로 리디렉트 처리 */
    <ErrorModal
      open={open}
      onOpenChange={setOpen}
      onConfirm={() => router.replace('/signin')}
      errorMessage={errorMessage}
    ></ErrorModal>
  );
};

export default KakaoLoginCallbackPage;
