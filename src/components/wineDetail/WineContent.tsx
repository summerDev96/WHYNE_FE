import React from 'react';

import { Badge } from '@/components/ui/badge';

interface Props {
  name: string;
  region: string;
  price: number;
}

function WineContent({ name, region, price }: Props) {
  return (
    <div className='absolute left-[98px] md:left-[204px] xl:left-[244px] w-[200px] md:w-[400px]'>
      <h2 className='text-[20px] md:text-[30px] font-[600] leading-[1] mt-[17px] md:mt-[36px]'>
        {name}
      </h2>
      <p className='text-gray-500 custom-text-md-regular md:custom-text-lg-regular  mt-[15px] md:mt-[20px] '>
        {region}
      </p>
      <Badge
        variant={'priceBadge'}
        className='custom-text-md-bold md:custom-text-2lg-bold md:mt-[14px]'
      >
        ₩{' ' + price.toLocaleString('ko-KR')}
      </Badge>
    </div>
  );
}

export default WineContent;
