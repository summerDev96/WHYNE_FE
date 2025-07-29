import { ReactNode } from 'react';

interface ReviewCardProps {
  children: ReactNode;
}

interface UserHeaderProps {
  userIcon: ReactNode;
  reviewId: number;
  children: ReactNode;
}

interface TagAndRatingProps {
  reviewId: number;
}

interface ReviewBodyProps {
  reviewId: number;
  flavorSliderSlot: ReactNode;
}

interface ToggleButtonProps {
  reviewId: number;
}

export type {
  ReviewCardProps,
  UserHeaderProps,
  TagAndRatingProps,
  ReviewBodyProps,
  ToggleButtonProps,
};
