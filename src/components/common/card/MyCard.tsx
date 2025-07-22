import React from "react";

import { cn } from "@/lib/utils";

interface MyCardProps {
  rating: React.ReactNode; // 별점 숫자
  timeAgo: string; // 작성 시간
  title: string; // 제목
  review: string; // 리뷰
  rightSlot?: React.ReactNode; // 상단 우측 slot (메뉴 버튼 등)
  className?: string; // 컨테이너 클래스
}

export function MyCard({
  rating,
  timeAgo,
  title,
  review,
  rightSlot,
  className,
}: MyCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-xl bg-white p-4 flex flex-col gap-2 border border-gray-300",
        className,
      )}
    >
      {/* 상단 정보 영역 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          {/* 별점 */}
          {rating}
          {/* 시간 */}
          <span>{timeAgo}</span>
        </div>

        {/* 상단 우측 slot */}
        {rightSlot && <div>{rightSlot}</div>}
      </div>

      {/* 제목 */}
      <h3 className="text-md font-semibold text-gray-900">{title}</h3>

      {/* 리뷰 내용 */}
      <p className="text-sm text-gray-700">{review}</p>
    </div>
  );
}
