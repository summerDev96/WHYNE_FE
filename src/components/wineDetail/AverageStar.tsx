import React from 'react';

interface Props {
  rating: number;
}

function AverageStar({ rating }: Props) {
  // const star = Math.floor(rating);

  return <div>{rating}</div>;
}

export default AverageStar;
