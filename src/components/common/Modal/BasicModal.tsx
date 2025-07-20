import React from "react";

import Close from "@/assets/icons/close.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BasicModalProps {
  type?: "register" | "review" | "filter";
  title?: string;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
}

const widthClass = {
  register: "w-full max-w-[375px] md:max-w-none md:w-[460px]",
  review: "w-full max-w-[375px] md:max-w-none md:w-[528px]",
  filter: "max-w-[375px]",
};

const BasicModal = ({
  type = "register",
  title = "모달 제목",
  children,
  buttons,
  open,
  onOpenChange,
  showCloseButton = true,
}: BasicModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form aria-labelledby="modal-title">
        <DialogContent
          className={`${widthClass[type]} rounded-xl [&>button:last-child]:hidden`}
        >
          {showCloseButton && (
            <DialogClose asChild>
              <button className="absolute top-4 right-5" aria-label="Close">
                <Close width={24} height={24} />
              </button>
            </DialogClose>
          )}
          <DialogHeader>
            <DialogTitle
              id="modal-title"
              className="text-xl md:text-2xl text-left"
            >
              {title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              다이얼로그 내용
            </DialogDescription>
          </DialogHeader>
          {/* 컨텐츠 영역 */}
          {children}
          <DialogFooter className="w-full flex flex-row justify-between gap-2">
            {buttons}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default BasicModal;
