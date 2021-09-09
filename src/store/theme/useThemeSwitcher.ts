import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

import { useAppDispatch, useAppSelector } from '../store.types'

import { ThemeActions } from './theme.reducer'

export const useThemeSwitcher = () => {
  const colorScheme = useColorScheme()
  const dispatch = useAppDispatch()

  const { automaticColorScheme, theme: themeName } = useAppSelector((state) => state.theme)

  useEffect(() => {
    if (colorScheme && automaticColorScheme && colorScheme !== themeName) {
      dispatch(ThemeActions.changeTheme({ theme: colorScheme }))
    }
  }, [dispatch, colorScheme, automaticColorScheme, themeName])
}
