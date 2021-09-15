import type { AppTheme } from './themes'

import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

import { useAppTheme } from './context'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>, E = undefined>(
  create: (theme: AppTheme, extraParam: E) => T | StyleSheet.NamedStyles<T>,
  extra?: E
): T {
  const theme = useAppTheme()

  return useMemo(() => {
    return StyleSheet.create(create(theme, extra as E))
  }, [theme, create, extra])
}
