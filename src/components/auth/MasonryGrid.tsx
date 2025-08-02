import { useState } from 'react';

import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface MasonryGridProps {
  images: string[];
}

export default function MasonryGrid({ images }: MasonryGridProps) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 0: 1, 350: 1, 743: 3, 1400: 5 }}
      className='w-full h-full'
    >
      <Masonry gutter='10px'>
        {images.map((src, i) => (
          <ImageWithSkeleton key={i} src={src} index={i} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

function ImageWithSkeleton({ src, index }: { src: string; index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`w-full rounded overflow-hidden relative ${
        !loaded ? 'bg-gray-200 animate-pulse' : ''
      }`}
    >
      <Image
        src={src}
        alt={`image-${index}`}
        width={300}
        height={200}
        className={`w-full h-auto block object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        loading='lazy'
      />
    </div>
  );
}
