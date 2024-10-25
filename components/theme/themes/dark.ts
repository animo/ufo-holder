import { extendTheme } from 'native-base'

import { baseColors } from './base'

export const dark = {
  colors: {
    ...baseColors,
    background: {
      '50': '#f5f5f5',
      '100': '#eaeaea',
      '200': '#cbcccb',
      '300': '#acadac',
      '400': '#6e6f6d',
      '500': '#30312f',
      '600': '#2b2c2a',
      '700': '#242523',
      '800': '#1d1d1c',
      '900': '#181817',
    },
    text: {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#ffffff',
      '600': '#e6e6e6',
      '700': '#bfbfbf',
      '800': '#999999',
      '900': '#7d7d7d',
    },
    textSubdued: {
      '50': '#fafafa',
      '100': '#f4f4f4',
      '200': '#e4e4e4',
      '300': '#d4d4d4',
      '400': '#b3b3b3',
      '500': '#939393',
      '600': '#848484',
      '700': '#6e6e6e',
      '800': '#585858',
      '900': '#484848',
    },
  },
  darkMode: true,
}

export const darkTheme = () => extendTheme(dark)
