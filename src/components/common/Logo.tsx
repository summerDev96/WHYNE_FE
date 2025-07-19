import React from "react";

import Link from "next/link";

import LogoIcon from "@/assets/logo.svg";

function Logo() {
  return (
    <Link href="/" className="w-[52px] h-[15px]">
      <LogoIcon />
    </Link>
  );
}

export default Logo;
