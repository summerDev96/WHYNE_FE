import Gnb from '@/components/common/Gnb';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutGnb = ['/login', '/signUp'];

  return (
    <>
      {!pagesWithoutGnb.includes(pathname) && <Gnb />}
      <Component {...pageProps} />
    </>
  );
}
