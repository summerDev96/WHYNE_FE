import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 색상, 폰트 조정필요 (배경, 폰트크기,굴기, 테두리(borer))
const badgeVariants = cva(
  "inline-flex items-center justify-center  rounded-md text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        //모달에서 테블릿,데탑 h-46 px-2.5 py-4.5 별로 조금씩다름 나중에 조정필요
        chooseFlavor:
          "bg-white text-black custom-text-md-medium md:custom-text-lg-medium border border-gray-300 hover:bg-primary hover:text-white hover:border-primary h-[36px] rounded-full px-2.5 py-1.5",
        chooseWineType:
          "bg-white text-black custom-text-md-medium md:custom-text-lg-medium border border-gray-300 hover:bg-primary hover:text-white hover:border-primary h-[36px] md:h-[42px] rounded-full px-2.5 py-1.5",
        priceBadge:
          "bg-primary-100 text-primary custom-text-md-bold md:custom-text-2lg-bold h-[29px] md:h-[42px] px-2.5 py-[2.5px] md:px-2.5 md:py-1.5 rounded-[10px] md:rounded-[12px]",
        flavor:
          "bg-white text-black custom-text-md-medium md:custom-text-lg-medium border border-gray-300 h-[36px] rounded-full px-2.5 py-1.5",
        star: "bg-primary-100 text-primary custom-text-md-bold md:custom-text-2lg-bold h-[36px] md:h-[42px] px-2.5 py-1.5 md:px-[15px] md:py-2 rounded-[12px]",
        taste:
          "bg-gray-100 text-gray-500 custom-text-xs-semibold md:custom-text-md-semibold h-[30px] md:h-[28px] px-[11px] py-[5px] md:px-[15px] md:py-[5px] rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "chooseFlavor",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <label className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
