import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { signInKakao } from '@/api/auth';
import ConfirmModal from '@/components/common/Modal/ConfirmModal';
import { Button } from '@/components/ui/button';
import { KakakoSignInRequest, KakakoSignInResponse } from '@/types/AuthTypes';

const KakaoLoginCallbackPage = () => {
  const router = useRouter();
  const { code } = router.query;

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 에러 처리: 모달로 메시지 출력
  const handleError = () => {
    setErrorMsg('카카오 로그인을 재시도해주세요');
    setShowModal(true);
  };

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
    if (error) {
      // 1. 400 잘못된 인가 코드입니다.
      handleError();
    }

    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.replace('/');
    }
  }, [data, error, router, code]);

  return (
    <ConfirmModal
      open={showModal}
      onOpenChange={setShowModal}
      buttons={
        <>
          <Button
            size='xl'
            width='xl'
            variant='purpleDark'
            className='flex-auto text-base font-bold'
            onClick={() => {
              setShowModal(false);
              router.replace('/signin');
            }}
          >
            확인
          </Button>
        </>
      }
    >
      {/* 모달 내용 영역 */}
      {errorMsg}
    </ConfirmModal>
  );
};

export default KakaoLoginCallbackPage;
