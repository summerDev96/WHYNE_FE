import DotIcon from '@/assets/icons/dot.svg';
import { MyCard } from '@/components/common/card/MyCard';
import { Badge } from '@/components/ui/badge';

// mockUser.ts 에서 이렇게 export 했다고 가정
import type { Review } from './mockUser';

interface ReviewListProps {
  items: Review[];
}

export function ReviewList({ items }: ReviewListProps) {
  return (
    <div className='space-y-4'>
      {items.map((r) => (
        <MyCard
          key={r.id}
          rating={<Badge variant='star'>★ {r.rating.toFixed(1)}</Badge>}
          timeAgo={r.timeAgo}
          title={r.title}
          review={r.review}
          rightSlot={
            <button className='w-6 h-6 text-gray-500'>
              <DotIcon />
            </button>
          }
        />
      ))}
    </div>
  );
}
