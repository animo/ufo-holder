import type { dark } from './dark'
import type { light } from './light'

export { darkTheme } from './dark'
export { lightTheme } from './light'

export type AppTheme = typeof light | typeof dark
export type ColorNames = keyof AppTheme['colors']

/**
 * base.ts  -> includes the base colors that will be used in the app
 * light.ts -> includes the light theme specifc colors (extends the base.ts)
 * dark.ts  -> includes the dark theme specific colors (extends the base.ts)
 */
