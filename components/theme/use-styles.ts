import type { Theme } from './types'

import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from './context'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>, E = undefined>(
  create: (theme: Theme, extraParam: E) => T | StyleSheet.NamedStyles<T>,
  extra?: E
): T {
  const theme = useTheme()

  return useMemo(() => {
    return StyleSheet.create(create(theme, extra as E))
  }, [theme, create, extra])
}
