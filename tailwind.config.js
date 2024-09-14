/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx,mdx}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        pinkprimary: {
          100: '#F47796',
        },
        purpleprimary: {
          100: '#5C1A2D',
        },
        transparent: 'transparent',
        current: 'currentColor',
        blue: colors.blue,
        slate: colors.slate,
        gray: colors.gray,
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: colors.stone,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        lime: colors.lime,
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        indigo: colors.indigo,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,
      },
    },
  },
  plugins: [],
};
