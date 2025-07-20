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
 * SelectDropdown
 * - 폼 입력용 드롭다운 컴포넌트
 * - 선택된 항목이 버튼 텍스트로 표시됨
 * - 반응형 너비 (모바일/PC)
 */
interface SelectDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectDropdown({
  value,
  options,
  onChange,
  placeholder = "선택하세요",
}: SelectDropdownProps) {
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium shadow-sm hover:border-violet-400 transition-colors text-left",
            "w-[303px] md:w-[412px]"
          )}
        >
          {selectedLabel}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className={cn(
          "rounded-2xl border border-gray-200 bg-white px-1.5 py-1.5 space-y-1",
          "w-[303px] md:w-[412px]"
        )}
      >
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <DropdownMenuItem
              aria-label={option.label}
              key={option.value}
              onClick={() => onChange(option.value)}
              data-value={option.value}
              className={cn(
                "w-full px-3 py-2.5 text-sm md:text-base text-left rounded-xl cursor-pointer transition-colors data-[highlighted]:bg-violet-50 data-[highlighted]:text-violet-800",
                isSelected
                  ? "bg-violet-100 text-violet-800 font-semibold"
                  : "text-gray-800"
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
