import { createSlice } from '@reduxjs/toolkit'

import { AppSelectors } from './app.selectors'
import { AppThunks } from './app.thunks'

export interface AppState {
  isInitialized: boolean
  isInitializing: boolean
  error?: string
}

const initialState: AppState = {
  isInitialized: false,
  isInitializing: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AppThunks.initialize.pending, (state) => {
      state.isInitialized = false
      state.isInitializing = true
    })
    builder.addCase(AppThunks.initialize.fulfilled, (state) => {
      state.isInitialized = true
      state.isInitializing = false
    })
    builder.addCase(AppThunks.initialize.rejected, (state) => {
      state.isInitialized = false
      state.isInitializing = false
    })
  },
})

const { reducer } = appSlice
export { AppThunks, reducer as AppReducer, AppSelectors }
