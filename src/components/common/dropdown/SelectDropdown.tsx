import React from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

/** SelectDropdown 옵션 타입 */
export interface Option<T extends React.Key> {
  label: React.ReactNode;
  value: T;
  /** 접근성 레이블 (없으면 내부에서 fallback 처리) */
  ariaLabel?: string;
}

/**
 * SelectDropdown
 * - 폼 입력용 드롭다운 컴포넌트
 * - trigger prop으로 원하는 요소를 넘겨 사용 가능
 * - 선택된 항목을 버튼 텍스트로 표시 (기본 trigger)
 * - 반응형 너비 (모바일/PC)
 */
interface SelectDropdownProps<T extends React.Key> {
  selectedValue: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  trigger: React.ReactElement;
}

export default function SelectDropdown<T extends React.Key>({
  selectedValue,
  options,
  onChange,
  placeholder = '선택하세요',
  trigger,
}: SelectDropdownProps<T>) {
  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label || placeholder;

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
        align='start'
        className={cn(
          'rounded-2xl border border-gray-200 bg-white px-1.5 py-1.5 space-y-1',
          'w-[303px] md:w-[412px]',
        )}
      >
        {options.map(({ label, value, ariaLabel }) => (
          <DropdownMenuItem
            key={value}
            aria-label={ariaLabel ?? (typeof label === 'string' ? label : String(value))}
            onClick={() => onChange(value)}
            data-value={value}
            className={cn(
              'w-full px-3 py-2.5 text-sm md:text-base text-left rounded-xl cursor-pointer transition-colors',
              'data-[highlighted]:bg-violet-50 data-[highlighted]:text-violet-800',
              value === selectedValue
                ? 'bg-violet-100 text-violet-800 font-semibold'
                : 'text-gray-800',
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
