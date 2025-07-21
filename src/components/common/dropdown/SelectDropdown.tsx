import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Option {
  label: React.ReactNode;
  value: string;
  ariaLabel?: string;
}

/**
 * SelectDropdown
 * - 폼 입력용 드롭다운 컴포넌트
 * - trigger prop으로 원하는 요소를 넘겨 사용 가능
 * - 선택된 항목을 버튼 텍스트로 표시 (기본 trigger)
 * - 반응형 너비 (모바일/PC)
 */
interface SelectDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  trigger: React.ReactElement;
}

export default function SelectDropdown({
  value,
  options,
  onChange,
  placeholder = "선택하세요",
  trigger,
}: SelectDropdownProps) {
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  // trigger의 children을 선택된 라벨로 교체
  const clonedTrigger = React.cloneElement(trigger, {
    children: selectedLabel,
  });

  return (
    <DropdownMenu>
      {/* 드롭다운 트리거 버튼 */}
      <DropdownMenuTrigger asChild>{clonedTrigger}</DropdownMenuTrigger>
      {/* 드롭다운 메뉴 영역 */}
      <DropdownMenuContent
        align="start"
        className={cn(
          "rounded-2xl border border-gray-200 bg-white px-1.5 py-1.5 space-y-1",
          "w-[303px] md:w-[412px]",
        )}
      >
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <DropdownMenuItem
              aria-label={option.ariaLabel}
              key={option.value}
              onClick={() => onChange(option.value)}
              data-value={option.value}
              className={cn(
                "w-full px-3 py-2.5 text-sm md:text-base text-left rounded-xl cursor-pointer transition-colors data-[highlighted]:bg-violet-50 data-[highlighted]:text-violet-800",
                isSelected
                  ? "bg-violet-100 text-violet-800 font-semibold"
                  : "text-gray-800",
              )}
            >
              {option.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
