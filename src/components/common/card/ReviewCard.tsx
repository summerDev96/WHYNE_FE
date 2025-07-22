import React from "react";

import { cn } from "@/lib/utils";

interface ReviewCardProps {
  userIcon: React.ReactNode; // 유저 아이콘
  username: string; // 유저 이름
  timeAgo: string; // 작성 시간
  tags: string[]; // 태그 목록
  rating: React.ReactNode; // 별점 영역 slot
  likeSlot: React.ReactNode; // 좋아요 버튼 slot
  menuSlot: React.ReactNode; // 메뉴 버튼 slot
  reviewText?: string; // 리뷰 목록
  flavorSliderSlot?: React.ReactNode; // 슬라이더
  className?: string; // 컨테이너 클래스
}

export function ReviewCard({
  userIcon,
  username,
  timeAgo,
  tags,
  rating,
  likeSlot,
  menuSlot,
  reviewText,
  flavorSliderSlot,
  className,
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-xl bg-white p-4 shadow-sm border border-gray-300",
        className,
      )}
    >
      {/* 상단: 유저 정보 & 우측 slot */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            {userIcon}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {username}
            </span>
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>
        </div>

        {/* 좋아요 & 메뉴 */}
        <div className="flex items-center gap-2">
          {likeSlot}
          {menuSlot}
        </div>
      </div>

      {/* 태그 & 별점 */}
      <div className="mt-3 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        {rating}
      </div>

      {/* 리뷰 텍스트 */}
      {reviewText && (
        <p className="mt-3 text-sm text-gray-800 leading-relaxed">
          {reviewText}
        </p>
      )}

      {/* 슬라이더 */}
      {flavorSliderSlot && <div className="mt-4">{flavorSliderSlot}</div>}
    </div>
  );
}
