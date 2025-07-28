/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '', // 포트가 없으면 비워둡니다.
        pathname: '/**', // 이 도메인의 모든 경로를 허용합니다. 필요에 따라 더 구체적으로 지정할 수 있습니다.
      },
    ],
  },

  webpack(config) {
    config.module.rules = config.module.rules.filter(
      (rule) => !(rule.test && rule.test.test && rule.test.test('.svg')),
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            replaceAttrValues: {
              none: 'currentColor',
              '#000': 'currentColor',
              '#000000': 'currentColor',
            },
            svgoConfig: {
              plugins: [
                { name: 'removeAttrs', params: { attrs: 'path:fill' } },
                {
                  name: 'removeViewBox',
                  active: false,
                },
                {
                  name: 'removeDimensions',
                  active: true,
                },
              ],
            },
          },
        },
      ],
      issuer: /\.[jt]sx?$/,
    });

    // console.log('Webpack config loaded from next.config.js (ESM context):', config.module.rules);

    return config;
  },
};
export default nextConfig;
