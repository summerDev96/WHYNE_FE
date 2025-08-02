import { create } from 'zustand';

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  rating: number;
  type: 'Red' | 'White' | 'Sparkling';
  review: string;
}

interface WineStoreState {
  wines: Wine[];
  addWine: (newWine: Wine) => void;
}

const useWineAddStore = create<WineStoreState>((set) => ({
  wines: [
    {
      id: 1,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image1.svg',
      price: 64900,
      rating: 4.5,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
  ],

  addWine: (newWine) =>
    set((state) => ({
      wines: [newWine, ...state.wines],
    })),
}));

export default useWineAddStore;
