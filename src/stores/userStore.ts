import { create } from 'zustand';

import { GetUserResponse } from '@/types/UserTypes';

/* Zustand 유저 상태 저장소 타입 */
interface UserStore {
  user: GetUserResponse | null;
  isLoggedIn: boolean;
  isUserLoading: boolean;

  /* 유저 정보 설정 (로그인 등) */
  setUser: (user: GetUserResponse) => void;

  /* 유저 정보 초기화 (로그아웃 등) */
  clearUser: () => void;

  /* 유저 정보 로딩 상태 변경 */
  setIsUserLoading: (loading: boolean) => void;
}

/**
 * 유저 상태 전역 스토어
 */
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isUserLoading: true,

  setUser: (user) =>
    set({
      user,
      isLoggedIn: true,
    }),

  clearUser: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),

  setIsUserLoading: (loading) => set({ isUserLoading: loading }),
}));
