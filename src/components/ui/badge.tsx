import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 색상, 폰트 조정필요 (배경, 폰트크기,굴기, 테두리(borer))
//24 25 26   ,28 29,32 34 ,38 ,42,46 다양한 높이, raius(6,8 ,100), 값을 그냥 받아서 쓰는게 좋고 편하지 않을까?
// 46 36
const badgeVariants = cva(
  "inline-flex items-center justify-center  rounded-md text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        //모달에서 테블릿,데탑 h-46 px-2.5 py-4.5 별로 조금씩다름 나중에 조정필요
        chooseFlavor:
          "bg-white text-black border border-gray-300 hover:bg-purpleDark hover:text-white hover:border-purpleDark h-[36px] rounded-full px-2.5 py-1.5",
        chooseWineType:
          "bg-white text-black border border-gray-300 hover:bg-purpleDark hover:text-white hover:border-purpleDark h-[36px] md:h-[42px] rounded-full px-2.5 py-1.5",
        priceBadge:
          "bg-purpleLight text-purpleDark h-[29px] md:h-[42px] px-2.5 py-[2.5px] md:px-2.5 md:py-1.5",
        flavor:
          "bg-white text-black border border-gray-300 h-[36px] rounded-full px-2.5 py-1.5",
        star: "bg-purpleLight text-purpleDark h-[36px] md:h-[42px] px-2.5 py-1.5 md:px-[15px] md:py-2",
        taste: "bg-gray-100 text-gray-500 ",
        purpleDark:
          "bg-purpleDark text-white hover:bg-purpleLight hover:text-purpleDark",
        white: "bg-white text-black border border-gray-300",
        purpleLight: "bg-purpleLight text-purpleDark",
        gray: "bg-white text-gray-500 border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "chooseFlavor",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
