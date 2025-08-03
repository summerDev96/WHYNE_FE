import '@/styles/globals.css';

import React, { useEffect, useState } from 'react';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Toaster } from 'sonner';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import Gnb from '@/components/common/Gnb';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import ScrollToTop from '@/components/common/scrollToTop';
import Splash from '@/components/Splash';
import { useInitUser } from '@/hooks/useInitUser';
import { useSetupNavigationListener } from '@/hooks/useIsInitialLoad';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useSetupNavigationListener();
  useInitUser();
  const router = useRouter();

  const { pathname } = useRouter();
  const pagesWithoutGnb = ['/signup', '/signin', '/oauth/signup/kakao'];
  const hideHeader = pagesWithoutGnb.includes(pathname);
  const isLanding = pathname === '/';
  const is404 = pathname === '/404';

  const [showSplash, setShowSplash] = useState(isLanding);

  useEffect(() => {
    if (isLanding) {
      const timer = setTimeout(() => setShowSplash(false), 2500); // 2초 보여주기
      return () => clearTimeout(timer);
    }
  }, [isLanding]);

  return (
    <>
      <Head>
        <title>WINE</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position='bottom-center'
          richColors
          duration={2000}
          toastOptions={{
            classNames: {
              description: 'custom-text-md-bold font-sans',
            },
          }}
        />
        {showSplash && <Splash />}
        <LoadingOverlay />
        <HydrationBoundary state={pageProps.dehydratedState}>
          {!hideHeader && <Gnb />}
          <ErrorBoundary fallback={<></>} router={router}>
            <div
              className={clsx({
                'pt-[70px] md:pt-[100px] xl:pt-[110px]': !hideHeader,
                'bg-gray-100': isLanding || is404,
              })}
            >
              <Component {...pageProps} />
              <ScrollToTop />
              <SpeedInsights />
            </div>
          </ErrorBoundary>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
