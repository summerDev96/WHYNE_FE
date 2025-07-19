import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
  inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
  disabled:pointer-events-none disabled:opacity-50
  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
  `,
  {
    // 색상, 폰트 조정필요 (배경, 폰트크기,굴기, 테두리(borer))
    //size, width 지정이 필요합니다
    //asChild가 true이면 <Slot>으로 렌더링해 <Link>같은 다른 컴포넌트에 스타일 적용이 가능하다고 합니다
    //반응형 xl: 1280 , md: 768 ,
    variants: {
      variant: {
        purpleDark:
          "bg-purpleDark text-white hover:bg-purpleLight hover:text-purpleDark",
        white: "bg-white text-black border border-gray-300",
        onlyCancel: "bg-white text-gray-500 border border-gray-300",
        purpleLight: "bg-purpleLight text-purpleDark",
      },
      size: {
        xs: "h-[40px] md:h-[42px] rounded-[12px]",
        sm: "h-[42px] md:h-[48px] rounded-[12px] ",
        md: "h-[48px] md:h-[50px] rounded-[12px] md:rounded-[16px]",
        lg: "h-[48px] md:h-[52px] rounded-[12px] md:rounded-[16px]",
        xl: "h-[54px] rounded-[12px]",
        onlyLanding: "h-[50px] rounded-[100px]",
      },
      width: {
        xs: "w-[61px] md:w-[68px]",
        sm: "w-[100px] md:w-[113px]",
        md: "w-[303px] md:w-[400px]",
        lg: "w-[343px] md:w-[400px]",
        xl: "w-[480px]",
        full: "w-full",
        onlyLanding: "w-[279px]",
      },
      fontSize: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-2xl",
      },
      fontWeight: {
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "white",
      size: "xs",
      fontSize: "sm",
      fontWeight: "normal",
      width: "xs",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      fontSize,
      fontWeight,
      className,
      variant,
      size,
      width,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            fontWeight,
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
Button.displayName = "Button";

export { Button, buttonVariants };
