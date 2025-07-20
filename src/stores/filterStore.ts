import { create } from "zustand";

export type WineType = "Red" | "White" | "Sparkling";

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
  type: "Red",
  setType: (val) => set({ type: val }),
  minPrice: 0,
  maxPrice: 1000000,
  setPriceRange: ([min, max]) => set({ minPrice: min, maxPrice: max }),
  rating: "0",
  setRating: (val) => set({ rating: val }),
}));

export default useFilterStore;
