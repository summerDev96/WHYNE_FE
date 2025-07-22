import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `
  inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
  disabled:pointer-events-none disabled:opacity-50
  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
  `,
  {
    //반응형 xl: 1280 , md: 768 ,
    variants: {
      variant: {
        purpleDark: 'bg-primary text-white hover:bg-primary-100 hover:text-primary',
        white: 'bg-white text-black border border-gray-300',
        onlyCancel: 'bg-white text-gray-500 border border-gray-300',
        purpleLight: 'bg-primary-100 text-primary',
      },
      size: {
        xs: 'h-[40px] md:h-[42px] rounded-[12px]',
        sm: 'h-[42px] md:h-[48px] rounded-[12px] ',
        md: 'h-[48px] md:h-[50px] rounded-[12px] md:rounded-[16px]',
        lg: 'h-[48px] md:h-[52px] rounded-[12px] md:rounded-[16px]',
        xl: 'h-[54px] rounded-[12px]',
        onlyLanding: 'h-[50px] rounded-[100px]',
      },
      width: {
        xs: 'w-[61px] md:w-[68px]',
        sm: 'w-[100px] md:w-[113px]',
        md: 'w-[303px] md:w-[400px]',
        lg: 'w-[343px] md:w-[400px]',
        xl: 'w-[480px]',
        full: 'w-full',
        onlyLanding: 'w-[279px]',
      },
      fontSize: {
        md: 'custom-text-md-bold md:custom-text-lg-bold',
        lg: 'custom-text-lg-bold',
      },
    },
    defaultVariants: {
      variant: 'white',
      size: 'xs',
      fontSize: 'md',
      width: 'xs',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ fontSize, className, variant, size, width, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({
            fontSize,
            variant,
            size,
            className,
            width,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
