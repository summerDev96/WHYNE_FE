import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { GetWineInfoResponse } from '@/types/WineTypes';

interface WineStates {
  nowWine: GetWineInfoResponse | null;
  setNowWine: (wine: GetWineInfoResponse) => void;
}

const wineStore = create<WineStates>((set) => ({
  nowWine: null,

  setNowWine: (wine) => {
    set({ nowWine: wine });
  },
}));

const useWineStore = <T>(selector: (state: WineStates) => T): T =>
  useStoreWithEqualityFn(wineStore, selector, shallow);

export default useWineStore;
