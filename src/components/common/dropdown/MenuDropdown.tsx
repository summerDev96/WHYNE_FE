import React from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

/**
 * 메뉴 드롭다운 옵션 타입 (value는 React.Key 제약)
 */
interface Option<T extends React.Key> {
  label: React.ReactNode;
  value: T;
  /** 접근성 레이블 (fallback 기본값은 컴포넌트 내부에서 처리) */
  ariaLabel?: string;
}

/**
 * MenuDropdown
 * - 수정/삭제 같은 액션을 위한 메뉴 드롭다운 컴포넌트
 * - trigger prop으로 원하는 요소를 넘겨서 사용
 * - 옵션 label에 ReactNode 허용 (이미지, 아이콘 등)
 */
interface MenuDropdownProps<T extends React.Key> {
  options: Option<T>[]; // 표시할 메뉴 항목들
  onSelect: (value: T) => void; // 항목 클릭 시 실행할 콜백
  trigger: React.ReactElement;
}

export default function MenuDropdown<T extends React.Key>({
  options,
  onSelect,
  trigger,
}: MenuDropdownProps<T>) {
  return (
    <DropdownMenu modal={false}>
      {/* 드롭다운 트리거 버튼 */}
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      {/* 드롭다운 메뉴 영역 */}
      <DropdownMenuContent
        align='end'
        className='min-w-[101px] md:w-[126px] rounded-2xl border border-gray-200 bg-white px-1.5 py-1.5 space-y-1'
      >
        {options.map(({ label, value, ariaLabel }) => (
          <DropdownMenuItem
            aria-label={ariaLabel ?? (typeof label === 'string' ? label : String(value))}
            key={value}
            onClick={() => onSelect(value)}
            className={cn(
              'w-full px-3 py-2.5 rounded-xl flex justify-center text-sm md:text-base font-medium text-gray-800 cursor-pointer transition-colors bg-transparent',
              'data-[highlighted]:bg-violet-50 data-[highlighted]:text-violet-800',
              'active:bg-violet-100 active:text-violet-800 active:font-semibold ',
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
