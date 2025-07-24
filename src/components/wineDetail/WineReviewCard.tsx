import React, { useEffect } from 'react';

import { ReviewCard } from '@/components/common/card/ReviewCard';
import UserDefaultImg from '@/components/common/UserDefaultImg';
import FlavorSliderList from '@/components/wineDetail/FlavorSliderList';
import Kebab from '@/components/wineDetail/Kebab';
import LikeButton from '@/components/wineDetail/LikeButton';
import useReviewCardStore from '@/stores/reviewCardStore';

//컨텍스트말고 주스탄드 기반 컴파운드 패턴
interface Props {
  content: string;
  user: {
    name: string;
  };
  updatedAt: string;
  aroma: string[];
  rating: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  id: string;
}

function WineReviewCard({ review }: { review: Props }) {
  const setReviews = useReviewCardStore((state) => state.setReviews);

  useEffect(() => {
    setReviews(review);
  }, []);

  const { id, lightBold, smoothTannic, drySweet, softAcidic } = review;

  return (
    <ReviewCard>
      <ReviewCard.UserHeader
        userIcon={<UserDefaultImg className='size-10 md:size-16' />}
        reviewId={id}
      >
        <LikeButton isLike={false} />
        <Kebab />
      </ReviewCard.UserHeader>
      <ReviewCard.TagAndRating reviewId={id}></ReviewCard.TagAndRating>
      <ReviewCard.ReviewBody
        reviewId={id}
        flavorSliderSlot={
          <FlavorSliderList
            lightBold={lightBold}
            smoothTannic={smoothTannic}
            drySweet={drySweet}
            softAcidic={softAcidic}
          />
        }
      ></ReviewCard.ReviewBody>
      <ReviewCard.ToggleButton reviewId={id} />
    </ReviewCard>
  );
}

export default WineReviewCard;
