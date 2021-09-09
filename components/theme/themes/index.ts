import { theme as dark } from './dark'
import { theme as light } from './light'

export const themes = {
  dark,
  light,
} as const

export type ThemeTypes = keyof typeof themes
