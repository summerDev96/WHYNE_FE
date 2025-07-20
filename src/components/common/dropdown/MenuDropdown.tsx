import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

/**
 * MenuDropdown
 * - 수정/삭제 같은 액션을 위한 메뉴 드롭다운 컴포넌트
 * - 버튼 클릭 시 옵션 리스트 표시
 * - 선택 시 onSelect 콜백 호출
 */
interface MenuDropdownProps {
  options: Option[]; // 표시할 메뉴 항목들
  onSelect: (value: string) => void; // 항목 클릭 시 실행할 콜백
  label?: string; // 버튼 텍스트 (기본: "메뉴")
}

export default function MenuDropdown({
  options,
  onSelect,
  label = "메뉴",
}: MenuDropdownProps) {
  return (
    <DropdownMenu>
      {/* 드롭다운 트리거 버튼 - 사용 시 Trigger 컴포넌트를 바꿔 넣어야합니다!*/}
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium  hover:bg-violet-700"
        >
          {label}
        </button>
      </DropdownMenuTrigger>

      {/* 드롭다운 메뉴 영역 */}
      <DropdownMenuContent
        align="start"
        className="min-w-[101px] md:w-[126px] rounded-2xl border border-gray-200 bg-white px-1.5 py-1.5 space-y-1"
      >
        {options.map((option) => (
          <DropdownMenuItem
            aria-label={option.label}
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              "w-full px-3 py-2.5 rounded-xl flex justify-center text-sm md:text-base font-medium text-gray-800 cursor-pointer transition-colors bg-transparent",
              "data-[highlighted]:bg-violet-50 data-[highlighted]:text-violet-800",
              "active:bg-violet-100 active:text-violet-800 active:font-semibold "
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
