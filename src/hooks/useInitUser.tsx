import { useEffect } from 'react';

import { getUser } from '@/api/user';
import { useUserStore } from '@/stores/userStore';

/**
 * 앱 진입 시 유저 정보를 패치하고 Zustand에 저장하는 훅 */
export const useInitUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setIsUserLoading = useUserStore((state) => state.setIsUserLoading);

  useEffect(() => {
    const fetchUser = async () => {
      setIsUserLoading(true); // 유저 정보 불러오기 시작

      try {
        const user = await getUser(); //  API 호출
        setUser(user); // 로그인 상태로 전역 상태 설정
      } catch (error) {
        clearUser(); // 실패 시 로그아웃 상태로 초기화
      } finally {
        setIsUserLoading(false); // 로딩 끝
      }
    };

    fetchUser();
  }, [setUser, clearUser, setIsUserLoading]);
};
