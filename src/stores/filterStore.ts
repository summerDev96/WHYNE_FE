import { create } from 'zustand';

export type WineType = 'Red' | 'White' | 'Sparkling';

type FilterState = {
  type: WineType;
  setType: (val: WineType) => void;
  minPrice: number;
  maxPrice: number;
  setPriceRange: (range: [number, number]) => void;
  rating: string;
  setRating: (val: string) => void;
  reset: () => void;
};

const initialFilterState = {
  type: 'Red' as WineType,
  minPrice: 0,
  maxPrice: 1000000,
  rating: 'all',
};

const useFilterStore = create<FilterState>((set) => ({
  ...initialFilterState,
  setType: (type) => set({ type }),
  setPriceRange: ([minPrice, maxPrice]) => set({ minPrice, maxPrice }),
  setRating: (rating) => set({ rating }),
  reset: () => set(initialFilterState),
}));

export default useFilterStore;
