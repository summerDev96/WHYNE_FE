import * as React from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const DualSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value = [0, 0], onValueChange, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center mt-8",
      className
    )}
    value={value}
    onValueChange={onValueChange}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="flex flex-col items-center block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
      <span className="-mt-8">{value[0]}</span>
    </SliderPrimitive.Thumb>

    <SliderPrimitive.Thumb className="flex flex-col items-center block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
      <span className="-mt-8">{value[1]}</span>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
DualSlider.displayName = SliderPrimitive.Root.displayName;

export { DualSlider };
