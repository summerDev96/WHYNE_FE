import React from "react";

interface ImageCardProps {
  imageSrc: string;
  children?: React.ReactNode; // 이미지 우측에 있는 텍스트
  rightSlot?: React.ReactNode; // 우측 상단 버튼
}

export default function ImageCard({
  imageSrc,
  children,
  rightSlot,
}: ImageCardProps) {
  return (
    <div className="flex w-full rounded-xl bg-white p-4">
      {/* 왼쪽 | 와인 이미지*/}
      <div className="flex-shrink-0">
        <img
          src={imageSrc}
          alt="와인 이미지"
          className="h-28 w-20 rounded-md object-cover"
        />
      </div>

      {/* 오른쪽 | 텍스트 or 우측 상단 버튼*/}
      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div className="text-sm text-gray-900">{children}</div>

          {/* 우측 상단 버튼 */}
          {rightSlot && (
            <div>
              {/* TODO: 공통 컴포넌트로 교체 예정 */}
              {rightSlot}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
