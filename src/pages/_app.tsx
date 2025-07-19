import "@/styles/globals.css";

import { useRouter } from "next/router";

import Gnb from "@/components/common/Gnb";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutGnb = ["/login", "/signUp", "/_error"];

  return (
    <>
      {!pagesWithoutGnb.includes(pathname) && <Gnb />}
      <Component {...pageProps} />
    </>
  );
}
