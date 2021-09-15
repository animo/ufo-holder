import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

type ThemeName = 'light' | 'dark'

export interface ThemeState {
  themeName: ThemeName
  automaticColorScheme: boolean
}

const initialState: ThemeState = {
  themeName: 'light',
  automaticColorScheme: true,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDefaultTheme(state, { payload }: PayloadAction<{ themeName: ThemeName }>) {
      state.themeName = payload.themeName
    },
    changeTheme(state, { payload }: PayloadAction<{ themeName: ThemeName }>) {
      state.themeName = payload.themeName
    },
  },
})

const { actions, reducer } = themeSlice
export { actions as ThemeActions, reducer as ThemeReducer }
