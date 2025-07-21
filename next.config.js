/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules = config.module.rules.filter(
      (rule) => !(rule.test && rule.test.test && rule.test.test(".svg"))
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            replaceAttrValues: {
              none: "currentColor",
              "#000": "currentColor",
              "#000000": "currentColor",
            },
            svgoConfig: {
              plugins: [
                { name: "removeAttrs", params: { attrs: "path:fill" } },
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "removeDimensions",
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
