import type { StyleSheet } from 'react-native'

export type ColorNames = keyof Theme['colors']

export type Theme = {
  colors: {
    darkestShade: string
    lightestShade: string

    transparent: string
    primary: string
    secondary: string
    accent: string

    text: string
    textSubdued: string
    textSubduedDarker: string

    success: string
    warning: string
    danger: string

    textPrimary: string
    textSecondary: string
    textSuccess: string
    textAccent: string
    textWarning: string
    textDanger: string

    background: string
    bottomBarBackground: string
    backgroundShade: string

    // navigation
    card: string
    border: string
    borderSubdued: string
    notification: string

    black: string
    white: string
  }
}

export type ThemedStylesFunction<E = undefined, T = Record<string, unknown>> = (
  theme: Theme,
  extra: E
) => StyleSheet.NamedStyles<T>
