import { create } from 'zustand';

interface NavigationState {
  isFirstPageLoad: boolean;
  setNavigated: () => void; // 네비게이션이 발생했음을 기록하는 액션
}

// 스토어 생성
const useNavigationStore = create<NavigationState>()((set) => ({
  isFirstPageLoad: true,
  setNavigated: () => set({ isFirstPageLoad: false }),
}));

export default useNavigationStore;
