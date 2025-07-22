import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";

import Gnb from "@/components/common/Gnb";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutGnb = ["/login", "/signup", "/_error"];
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {!pagesWithoutGnb.includes(pathname) && <Gnb />}
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
