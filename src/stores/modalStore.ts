import { create } from 'zustand';

import { ModalState } from '@/types/ModalTypes';

const useModalStore = create<ModalState>((set) => ({
  type: 'register',
  title: '모달 제목',
  open: false,
  onOpenChange: (open) => set({ open }),
  showCloseButton: true,
}));

export default useModalStore;
