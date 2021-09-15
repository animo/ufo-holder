import { useEffect } from 'react'
import { useColorScheme } from 'react-native'

import { useAppDispatch, useAppSelector } from '../store.types'

import { ThemeActions } from './theme.reducer'

export const useThemeSwitcher = () => {
  const colorScheme = useColorScheme()
  const dispatch = useAppDispatch()

  const themeName = useAppSelector((state) => state.theme).themeName

  useEffect(() => {
    if (colorScheme && colorScheme !== themeName) {
      dispatch(ThemeActions.changeTheme({ themeName: colorScheme }))
    }
  }, [colorScheme, dispatch, themeName])
}
