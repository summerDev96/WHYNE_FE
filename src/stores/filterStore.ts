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
};

const useFilterStore = create<FilterState>((set) => ({
  type: 'Red',
  setType: (type) => set({ type }),
  minPrice: 0,
  maxPrice: 1000000,
  setPriceRange: ([minPrice, maxPrice]) => set({ minPrice, maxPrice }),
  rating: 'all',
  setRating: (rating) => set({ rating }),
}));

export default useFilterStore;
