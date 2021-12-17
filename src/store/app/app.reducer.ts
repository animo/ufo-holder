import type { Emergency } from '@internal/components/EmergencyBottomSheet'
import type { Coordinate } from '@internal/components/Map'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { MapViewDirectionsMode } from 'react-native-maps-directions'

import { createSlice } from '@reduxjs/toolkit'

import { AppSelectors } from './app.selectors'
// eslint-disable-next-line import/no-cycle
import { AppThunks } from './app.thunks'

export interface AppState {
  isInitialized: boolean
  isInitializing: boolean
  isFirstLaunch: boolean
  hasPotentialEmergency: boolean
  hasEmergency: boolean
  deviceToken?: string
  error?: string
  travelMode: MapViewDirectionsMode
  emergencyInfo?: {
    coordinate: Coordinate
    emergency: Emergency
  }
}

const initialState: AppState = {
  travelMode: 'WALKING',
  isInitialized: false,
  isInitializing: false,
  isFirstLaunch: true,
  hasPotentialEmergency: false,
  hasEmergency: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHasPotentialEmergency(state, action: PayloadAction<{ hasPotentialEmergency: boolean }>) {
      state.hasPotentialEmergency = action.payload.hasPotentialEmergency
    },
    setHasEmergency(state, action: PayloadAction<{ hasEmergency: boolean }>) {
      state.hasEmergency = action.payload.hasEmergency
    },
    setDeviceToken(state, action: PayloadAction<{ deviceToken: string }>) {
      state.deviceToken = action.payload.deviceToken
    },
    setTravelMode(state, action: PayloadAction<{ travelMode: MapViewDirectionsMode }>) {
      state.travelMode = action.payload.travelMode
    },
    setEmergencyInfo(
      state,
      action: PayloadAction<{
        coordinate: Coordinate
        emergency: Emergency
      }>
    ) {
      state.emergencyInfo = action.payload
    },
  },
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
    builder.addCase(AppThunks.newUser.fulfilled, (state) => {
      state.isFirstLaunch = false
    })
  },
})

const { reducer, actions } = appSlice
export { AppThunks, actions as AppActions, reducer as AppReducer, AppSelectors }
