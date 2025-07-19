import React from "react";

import clsx from "clsx";
import { useFormState } from "react-hook-form";

interface Props {
  children: React.ReactNode;
}

export default function SubmitButton({ children }: Props) {
  const { isValid } = useFormState();

  return (
    <button
      type="submit"
      className={clsx({
        "bg-[#CFDBEA]": !isValid, //유효하지 않을 때 true
        "bg-[#d9a1e7]": isValid, //유효하면 true
      })}
    >
      {children}
    </button>
  );
}
