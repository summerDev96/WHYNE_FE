import animate from 'tailwindcss-animate';

import shadTheme from './src/styles/shadTheme';

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      ...shadTheme,
      colors: {
        ...shadTheme.colors,
        purpleDark: '#6A42DB',
        purpleLight: '#F1EDFC',
      },
    },
  },
  plugins: [animate],
};
export default config;
