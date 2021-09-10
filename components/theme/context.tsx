import type { ThemeTypes } from './themes'
import type { Theme } from './types'
import type { FunctionComponent } from 'react'

import { extendTheme, NativeBaseProvider } from 'native-base'
import React, { createContext, useContext, useMemo } from 'react'

import { themes } from './themes'

interface ThemeContextValue extends Theme {
  darkMode: boolean
}

interface ThemeContextProps {
  themeName: ThemeTypes
}

const ThemeContext = createContext<undefined | ThemeContextValue>(undefined)

export const ThemeContextProvider: FunctionComponent<ThemeContextProps> = ({ children, themeName }) => {
  const value = useMemo<ThemeContextValue>(() => {
    const theme = themeName ? themes[themeName] : themes.light
    return {
      ...theme,
      darkMode: themeName === 'dark',
    }
  }, [themeName])

  const theme = extendTheme(value.colors)

  return (
    <ThemeContext.Provider value={value}>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw Error('"useTheme" can only be used inside of "ThemeContextProvider"')
  }

  return ctx
}
