import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

export default <Config>(<unknown>{
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      heading: ['var(--font-montserrat)'],
      sans: ['var(--font-inter)'],
    },
    extend: {
      fontSize: {
        '2xs': ['0.625rem', '0.75rem'],
        '3xs': ['0.5rem', '0.70rem'],
      },
      colors: {
        neutral: {
          50: '#f6f8f9',
          100: '#e3e9ed',
          200: '#d3dade',
          300: '#b3bec6',
          400: '#97a5b0',
          500: '#728592',
          600: '#5f7381',
          700: '#526675',
          800: '#3e5160',
          900: '#293c4b',
          950: '#172938',
        },
        primary: {
          50: '#fff9ec',
          100: '#fff1d2',
          200: '#ffdfa5',
          300: '#ffc66d',
          400: '#ffa231',
          500: '#ff8608',
          600: '#ff6d00',
          700: '#cc4e03',
          800: '#a13d0b',
          900: '#82340c',
        },
        secondary: {
          50: '#f2fbf9',
          100: '#d5f2ec',
          200: '#aae5da',
          300: '#78d0c3',
          400: '#4cb5a9',
          500: '#31968c',
          600: '#267b75',
          700: '#22635f',
          800: '#1f504e',
          900: '#1f4341',
          950: '#0b2726',
        },
        error: colors.red,
        warning: colors.amber,
        success: {
          50: '#f3faec',
          100: '#e4f4d3',
          200: '#cbeaad',
          300: '#aada7d',
          400: '#7fc342',
          500: '#6cad35',
          600: '#528a25',
          700: '#3f6a21',
          800: '#35551f',
          900: '#2f481f',
          950: '#16270b',
        },
        info: {
          50: '#effbfc',
          100: '#d5f2f8',
          200: '#b1e5f0',
          300: '#77cfe5',
          400: '#3db2d3',
          500: '#2196b9',
          600: '#1f789b',
          700: '#1f617f',
          800: '#225168',
          900: '#214459',
          950: '#102c3c',
        },
      },
      boxShadow: {
        sm: '0 2px 4px 0px rgba(0,0,0,0.06)',
        xl: '0 8px 10px -6px rgba(0,0,0,0.10), 0 20px 25px -5px rgba(0,0,0,0.05)',
      },
      spacing: {
        18: '4.5rem',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-bullets': theme('colors.primary[600]'),
            maxWidth: 'none',
            p: {
              lineHeight: 2,
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
    plugin(({ addVariant }) => {
      addVariant('hover-touch', [
        '@media (hover: hover) and (pointer: fine) { &:hover }',
      ]);
      addVariant('group-hover-touch', [
        '@media (hover: hover) and (pointer: fine) { :merge(.group):hover &}',
      ]);
      addVariant('peer-hover-touch', [
        '@media (hover: hover) and (pointer: fine) { :merge(.peer):hover & }',
      ]);
    }),
  ],
});
