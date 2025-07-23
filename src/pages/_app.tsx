import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Gnb from '@/components/common/Gnb';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutGnb = ['/login', '/signup', '/signin', '/_error'];
  const hideHeader = pagesWithoutGnb.includes(pathname);

  return (
    <>
      <Head>
        <title>WINE</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='와인 리뷰 사이트' />
        <meta property='og:title' content='WINE' />
        <meta property='og:description' content='와인 리뷰 사이트' />
        {/* todo: 배포 후 이미지, url 변경 필요 */}
        <meta property='og:image' content='' />
        <meta property='og:url' content='' />
        <meta property='og:type' content='website' />
      </Head>
      <QueryClientProvider client={queryClient}>
        {!hideHeader && <Gnb />}
        <div
          className={clsx({
            'pt-[70px] md:pt-[100px] xl:pt-[110px]': !hideHeader,
          })}
        >
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </>
  );
}
