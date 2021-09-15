import type { AppTheme } from './themes'
import type { FunctionComponent } from 'react'

import { NativeBaseProvider, useTheme } from 'native-base'
import React, { useMemo } from 'react'

import { darkTheme, lightTheme } from './themes'

export interface ThemeTypes {
  theme: AppTheme
}

interface ThemeContextProps {
  darkMode: boolean
}

export const ThemeContextProvider: FunctionComponent<ThemeContextProps> = ({ children, darkMode }) => {
  const theme = useMemo(() => {
    return darkMode ? darkTheme() : lightTheme()
  }, [darkMode])

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
}

export const useAppTheme = (): AppTheme => {
  const ctx = useTheme()

  if (!ctx) {
    throw Error('"useAppTheme" can only be used inside of "ThemeContextProvider"')
  }

  return ctx as AppTheme
}
