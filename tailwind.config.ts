import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const px0To10 = {
  ...Array.from(Array(11)).reduce(
    (acc, _, i) => ({ ...acc, [i]: `${i}px` }),
    {},
  ),
}
const px0To100 = {
  ...Array.from(Array(101)).reduce(
    (acc, _, i) => ({ ...acc, [i]: `${i}px` }),
    {},
  ),
}
const px0To1000 = {
  ...Array.from(Array(10000)).reduce(
    (acc, _, i) => ({ ...acc, [i]: `${i}px` }),
    {},
  ),
}

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      customFont: '#333333',
      orange: '#FF9900',
      black: '#000000',
    },
    extend: {
      width: px0To1000,
      height: px0To1000,
      borderWidth: px0To10,
      fontSize: px0To100,
      lineHeight: px0To100,
      minWidth: px0To1000,
      minHeight: px0To1000,
      spacing: px0To1000,
      borderRadius: { ...px0To100, button: 6 },
    },
  },
  plugins: [nextui()],
}

export default config
