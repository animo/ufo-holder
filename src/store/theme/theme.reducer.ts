import type { ThemeTypes } from '@components/theme/themes'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
  theme: ThemeTypes | null
  automaticColorScheme: boolean
}

const initialState: ThemeState = {
  theme: null,
  automaticColorScheme: true,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDefaultTheme(state, { payload }: PayloadAction<{ theme: ThemeTypes }>) {
      if (!state.theme) {
        state.theme = payload.theme
      }
    },
    changeTheme(state, { payload }: PayloadAction<{ theme: ThemeTypes }>) {
      state.theme = payload.theme
    },
  },
})

const { actions, reducer } = themeSlice
export { actions as ThemeActions, reducer as ThemeReducer }
