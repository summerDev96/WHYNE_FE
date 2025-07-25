import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const defaultOGImage = `${BASE_URL}/og-image.png`;
  return (
    <Html lang='ko'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta charSet='UTF-8' />
        <meta name='description' content='와인 리뷰 사이트' />
        <meta property='og:title' content='WINE' />
        <meta property='og:description' content='와인 리뷰 사이트' />
        {/* todo: 배포 후 이미지, url 변경 필요 */}
        <meta property='og:image' content={defaultOGImage} />
        <meta property='og:url' content={BASE_URL} />
        <meta property='og:type' content='website' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
