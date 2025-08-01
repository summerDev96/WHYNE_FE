import { useUserStore } from '@/stores/userStore';

/**
 * 전역 유저 상태를 쉽게 접근할 수 있는 커스텀 훅 */
export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const isUserLoading = useUserStore((state) => state.isUserLoading);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  return { user, isLoggedIn, isUserLoading, setUser, clearUser };
};
