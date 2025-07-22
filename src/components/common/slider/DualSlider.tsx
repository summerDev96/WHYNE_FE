import { DualSlider as BaseDualSlider } from '@/components/ui/dual-slider';
import { cn } from '@/lib/utils';

interface DualSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function DualSlider({
  value,
  onChange,
  min = 0,
  max = 10000,
  step = 1000,
  disabled = false,
  className,
  ariaLabel = '가격 범위 슬라이더',
}: DualSliderProps) {
  return (
    <BaseDualSlider
      aria-label={ariaLabel}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={value}
      onValueChange={(val) => onChange([val[0], val[1]])}
      className={cn('w-full h-7 pt-5', className)}
    />
  );
}
