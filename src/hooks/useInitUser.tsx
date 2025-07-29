import { useEffect } from 'react';

import { getUser } from '@/api/user';
import { useUserStore } from '@/stores/userStore';

/**
 * 앱 진입 시 유저 정보를 패치하고 Zustand에 저장하는 훅 */
export const useInitUser = () => {
  const setUser = useUserStore((state) => state.setUser);

  /* 처음에만 실행 */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        // 로그인 안 돼있는 경우 무시
      }
    };

    fetchUser();
  }, [setUser]);
};
