import '@/styles/globals.css';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import Gnb from '@/components/common/Gnb';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutGnb = ['/login', '/signup', '/_error'];
  const hideHeader = pagesWithoutGnb.includes(pathname);

  return (
    <>
      {!hideHeader && <Gnb />}
      <div
        className={clsx({
          'pt-[70px] md:pt-[100px] xl:pt-[110px]': !hideHeader,
        })}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
