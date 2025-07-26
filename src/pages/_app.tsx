import '@/styles/globals.css';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Gnb from '@/components/common/Gnb';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutGnb = [
    '/login',
    '/signup',
    '/signin',
    '/oauth/kakao',
    '/oauth/signup/kakao',
    '/_error',
  ];
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
          {!hideHeader && <Gnb />}
          <div
            className={clsx({
              'pt-[70px] md:pt-[100px] xl:pt-[110px]': !hideHeader,
              'bg-gray-100': isLanding,
            })}
          >
            <Component {...pageProps} />
          </div>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
