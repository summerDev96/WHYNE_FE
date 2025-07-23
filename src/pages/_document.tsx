import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta charSet='UTF-8' />
        <meta name='description' content='와인 리뷰 사이트' />
        <meta property='og:title' content='WINE' />
        <meta property='og:description' content='와인 리뷰 사이트' />
        {/* todo: 배포 후 이미지, url 변경 필요 */}
        <meta property='og:image' content='' />
        <meta property='og:url' content='' />
        <meta property='og:type' content='website' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
