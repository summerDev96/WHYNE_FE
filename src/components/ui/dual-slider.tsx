import * as React from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
const formatCurrency = (value: number) => `₩ ${value.toLocaleString()}`;

const thumbClass = cn(
  'relative flex flex-col items-center justify-center',
  'h-5 w-5 rounded-full border border-gray-300 bg-white shadow',
  'transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
  'disabled:pointer-events-none disabled:opacity-50',
);

const labelClass = cn(
  'absolute -top-7  min-w-[60px] custom-text-lg-regular text-primary',
  'text-center whitespace-nowrap',
);

const DualSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value = [0, 0], onValueChange, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center mt-8', className)}
    value={value}
    onValueChange={onValueChange}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-100'>
      <SliderPrimitive.Range className='absolute h-full rounded-full bg-primary' />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className={thumbClass}>
      <span className={labelClass}>{formatCurrency(value[0])}</span>
    </SliderPrimitive.Thumb>

    <SliderPrimitive.Thumb className={thumbClass}>
      <span className={labelClass}>{formatCurrency(value[1])}</span>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
DualSlider.displayName = SliderPrimitive.Root.displayName;

export { DualSlider };
