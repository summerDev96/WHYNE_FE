import '@/styles/globals.css';

import React from 'react';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';

// import ErrorBoundary from '@/components/common/ErrorBoundary';
import Gnb from '@/components/common/Gnb';
import { useInitUser } from '@/hooks/useInitUser';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useInitUser();
  const { pathname } = useRouter();
  const pagesWithoutGnb = ['/signup', '/signin', '/oauth/kakao', '/oauth/signup/kakao', '/_error'];
  const hideHeader = pagesWithoutGnb.includes(pathname);
  const isLanding = pathname === '/';

  return (
    <>
      <Head>
        <title>WINE</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          {/* <ErrorBoundary fallback={<div></div>}> */}
          {/* <React.Suspense fallback={<div>로딩 중입니다...</div>}> */}
          {!hideHeader && <Gnb />}
          <div
            className={clsx({
              'pt-[70px] md:pt-[100px] xl:pt-[110px]': !hideHeader,
              'bg-gray-100': isLanding,
            })}
          >
            <Component {...pageProps} />
          </div>
          {/* </React.Suspense> */}
          {/* </ErrorBoundary> */}
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
