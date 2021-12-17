import type { AppState } from './app.reducer'

const AppSelectors = {
  isInitializedSelector: (state: { app: AppState }) => state.app.isInitialized,
  hasEmergencySelector: (state: { app: AppState }) => state.app.hasPotentialEmergency,
  deviceTokenSelector: (state: { app: AppState }) => state.app.deviceToken,
  isFirstLaunchSelector: (state: { app: AppState }) => state.app.isFirstLaunch,
  emergencyInfo: (state: { app: AppState }) => state.app.emergencyInfo,
  travelMode: (state: { app: AppState }) => state.app.travelMode,
}

export { AppSelectors }
