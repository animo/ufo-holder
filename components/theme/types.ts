import type { AppTheme } from './themes'
import type { StyleSheet } from 'react-native'

export type ThemedStylesFunction<E = undefined, T = Record<string, unknown>> = (
  theme: AppTheme,
  extra: E
) => StyleSheet.NamedStyles<T>
