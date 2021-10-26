import { createSlice } from '@reduxjs/toolkit'

import { AppSelectors } from './app.selectors'
import { AppThunks } from './app.thunks'

export interface AppState {
  isInitialized: boolean
  isInitializing: boolean
  isFirstLaunch: boolean
  hasEmergency: boolean
  error?: string
}

const initialState: AppState = {
  isInitialized: false,
  isInitializing: false,
  isFirstLaunch: true,
  hasEmergency: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AppThunks.initializeAgent.pending, (state) => {
      state.isInitialized = false
      state.isInitializing = true
    })
    builder.addCase(AppThunks.initializeAgent.fulfilled, (state) => {
      state.isInitialized = true
      state.isInitializing = false
    })
    builder.addCase(AppThunks.initializeAgent.rejected, (state) => {
      state.isInitialized = false
      state.isInitializing = false
    })
    builder.addCase(AppThunks.emergency.fulfilled, (state, action) => {
      state.hasEmergency = action.payload
    })
    builder.addCase(AppThunks.newUser.fulfilled, (state) => {
      state.isFirstLaunch = false
    })
  },
})

const { reducer } = appSlice
export { AppThunks, reducer as AppReducer, AppSelectors }
