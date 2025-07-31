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
    {
      id: 2,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image3.svg',
      price: 64900,
      rating: 4.6,
      type: 'Sparkling',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 3,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image2.svg',
      price: 59900,
      rating: 3.6,
      type: 'White',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 4,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image4.svg',
      price: 74000,
      rating: 2.1,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 5,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image1.svg',
      price: 64900,
      rating: 4.5,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 6,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image3.svg',
      price: 64900,
      rating: 4.6,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 7,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image2.svg',
      price: 59900,
      rating: 3.6,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 8,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image4.svg',
      price: 74000,
      rating: 2.1,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 9,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image1.svg',
      price: 64900,
      rating: 4.5,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 10,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image3.svg',
      price: 64900,
      rating: 4.6,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 11,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image2.svg',
      price: 59900,
      rating: 3.6,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 12,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image4.svg',
      price: 74000,
      rating: 2.1,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 13,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image1.svg',
      price: 64900,
      rating: 4.5,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 14,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image3.svg',
      price: 64900,
      rating: 4.6,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 15,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image2.svg',
      price: 59900,
      rating: 3.6,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 16,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image4.svg',
      price: 74000,
      rating: 2.1,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 17,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image1.svg',
      price: 64900,
      rating: 4.5,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 18,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image3.svg',
      price: 64900,
      rating: 4.6,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 19,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: '/images/image2.svg',
      price: 59900,
      rating: 3.6,
      type: 'Red',
      review:
        'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
    },
    {
      id: 20,
      name: 'Palazzo della Torre 2017',
      region: 'Western Cape, South Africa',
      image: '/images/image4.svg',
      price: 74000,
      rating: 2.1,
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
