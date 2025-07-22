import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

import { Badge } from '../../ui/badge';

interface FlavorSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  labelLeft: string;
  labelRight: string;
  badgeLabel?: string;
  className?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
}

/**
 * FlavorSlider
 * - 좌우에 라벨이 붙은 단일 슬라이더
 * - 맛 성향을 시각적으로 표현할 때 사용
 */
export default function FlavorSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  labelLeft,
  labelRight,
  badgeLabel,
  className,
  ariaLabel = 'Flavor Slider',
  ariaLabelledby = 'flavor-slider-label',
}: FlavorSliderProps) {
  return (
    <div className='w-full flex items-center gap-4'>
      {badgeLabel && (
        <Badge variant='taste' className='ml-1' id={ariaLabelledby}>
          {badgeLabel}
        </Badge>
      )}
      <div className='flex items-center justify-between gap-2 flex-1'>
        {/* 왼쪽 라벨 */}
        <span className='whitespace-nowrap text-gray-800 custom-text-md-medium  md:custom-text-lg-medium'>
          {labelLeft}
        </span>
        {/* 슬라이더 */}
        <Slider
          aria-label={ariaLabel}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={[value]}
          onValueChange={(val) => onChange(val[0])}
          className={cn('flex-1 h-2', className)}
        />

        {/* 오른쪽 라벨 */}
        <span className='whitespace-nowrap text-gray-800 custom-text-md-medium  md:custom-text-lg-medium'>
          {labelRight}
        </span>
      </div>
    </div>
  );
}
