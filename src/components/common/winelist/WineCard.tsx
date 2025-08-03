import Link from 'next/link';

import StarIcon from '@/assets/icons/star.svg';
import { ImageCard } from '@/components/common/card/ImageCard';
import { cn } from '@/lib/utils';

interface WineCardProps {
  id: number;
  image: string;
  name: string;
  rating: number;
  isCarouselEnd?: boolean;
}

export default function WineCard({ id, image, name, rating, isCarouselEnd }: WineCardProps) {
  return (
    <Link
      href={`/wines/${id}`}
      key={id}
      className='no-underline'
      onClick={(e) => {
        if (isCarouselEnd) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div
        className={cn(
          'flex h-[160px] bg-white p-2 border border-gray-200 ',
          'rounded-[12px]',
          'shadow-[0px_2px_20px_0px_rgba(0,0,0,0.04)]',
          'md:w-[232px] md:h-[185px]',
        )}
      >
        <div className='flex-shrink-0'>
          <ImageCard
            imageSrc={image}
            className='p-0 border-none bg-transparent w-[80px] h-[112px]'
            imageClassName='w-[38px] h-[136px] ml-[10px] rounded-md object-cover mt-[14px] md:w-[44px] md:h-[155px] md:mt-[20px] md:ml-[20px]'
          />
        </div>

        <div className='w-[80px] h-[97px] flex flex-col justify-start mt-[10px] ml-[5px] md:w-[100px] md:h-[125px] md:ml-[20px]'>
          <div className='text-[28px] font-extrabold leading-100% text-gray-800 md:text-[36px] '>
            {rating.toFixed(1)}
          </div>
          <div className='flex gap-[4px] w-[60px] h-[12px] -mt-[2px] md:w-[90px] md:h-[18px]'>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  rating >= i + 1 ? 'fill-purpleDark' : 'fill-gray-300',
                  'w-[12px] h-[12px] md:w-[18px] md:h-[18px]',
                )}
              />
            ))}
          </div>
          <p className='text-[10px] leading-[140%] text-gray-500 mt-[10px] md:custom-text-xs-regular'>
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}
