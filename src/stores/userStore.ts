import { create } from 'zustand';

/* 유저 정보 타입 */
interface User {
  id: number;
  nickname: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

/* Zustand 유저 상태 저장소 타입 */
interface UserStore {
  user: User | null;
  isLoggedIn: boolean;

  /* 유저 정보 설정 (로그인 등) */
  setUser: (user: User) => void;

  /* 유저 정보 초기화 (로그아웃 등) */
  clearUser: () => void;
}

/**
 *  유저 상태 전역 스토어 */
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
}));
