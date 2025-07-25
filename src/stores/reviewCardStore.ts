import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

//리뷰카드 컴파운트 패턴용 스토어
interface ReviewItemTypes {
  content: string;
  user: { name: string };
  updatedAt: string;
  aroma: string[];
  rating: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  id: string;
  isOpen: boolean;
}

interface ReviewsbyId {
  [id: string]: ReviewItemTypes;
}

interface ReviewStates {
  allReviews: ReviewsbyId;
  setReviews: (review: Omit<ReviewItemTypes, 'isOpen'>) => void;
  toggleReviewOpen: (reviewId: string) => void;
}

export const reviewStore = create<ReviewStates>((set) => ({
  allReviews: {},
  setReviews: (reviewData) => {
    set((state) => {
      return {
        allReviews: {
          ...state.allReviews,
          [reviewData.id]: {
            ...reviewData,
            isOpen: state.allReviews[reviewData.id]?.isOpen ?? false,
          },
        },
      };
    });
  },

  toggleReviewOpen: (reviewId) => {
    set((state) => ({
      allReviews: {
        ...state.allReviews,
        [reviewId]: {
          ...state.allReviews[reviewId],
          isOpen: !state.allReviews[reviewId].isOpen,
        },
      },
    }));
  },

  //스토어 초기화는 굳이? 어차피 새로고침하면 사라지지 않나요?
}));

//use-sync-external-store 패키지 설치 후 useStoreWithEqualityFn으로 타입 지정해야 shallow제대로 인식
//-> 이거 외에 패키지 설치 안하는 방식으로 이것저것 해봤는데 도무지 못 찾겠네요 ㅠ

//aroma가 배열이라 shallow필요할 것 같긴 함
const useReviewCardStore = <T>(selector: (state: ReviewStates) => T): T =>
  useStoreWithEqualityFn(reviewStore, selector, shallow);

export default useReviewCardStore;
