import { ReactNode } from 'react';

interface ReviewCardProps {
  children: ReactNode;
}

interface UserHeaderProps {
  userIcon: ReactNode;
  reviewId: string;
  children: ReactNode;
}

interface TagAndRatingProps {
  reviewId: string;
}

interface ReviewBodyProps {
  reviewId: string;
  flavorSliderSlot: ReactNode;
}

interface ToggleButtonProps {
  reviewId: string;
}

export type {
  ReviewCardProps,
  UserHeaderProps,
  TagAndRatingProps,
  ReviewBodyProps,
  ToggleButtonProps,
};
