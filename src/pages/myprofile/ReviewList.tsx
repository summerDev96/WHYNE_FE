import React from 'react';

import DotIcon from '@/assets/icons/dot.svg';
import { MyCard } from '@/components/common/card/MyCard';
import MenuDropdown from '@/components/common/dropdown/MenuDropdown';
import { Badge } from '@/components/ui/badge';

import { mockUserReviewsResponse } from './mockUser';

interface ReviewListProps {
  items: typeof mockUserReviewsResponse.list;
}

export function ReviewList({ items }: ReviewListProps) {
  return (
    <div className='space-y-4 mt-4'>
      {items.map((r) => (
        <MyCard
          key={r.id}
          rating={<Badge variant='star'>★ {r.rating.toFixed(1)}</Badge>}
          timeAgo={new Date(r.createdAt).toLocaleDateString()}
          title={r.user.nickname}
          review={r.content}
          rightSlot={
            <MenuDropdown
              trigger={
                <button className='w-6 h-6 text-gray-500'>
                  <DotIcon />
                </button>
              }
              options={[
                { label: '수정하기', value: 'edit' },
                { label: '삭제하기', value: 'delete' },
              ]}
              onSelect={(value) => {
                console.log(`"${value}" clicked for review id: ${r.id}`);
              }}
            />
          }
        />
      ))}
    </div>
  );
}
