import { create } from 'zustand';

type SearchState = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const useWineSearchKeywordStore = create<SearchState>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useWineSearchKeywordStore;
