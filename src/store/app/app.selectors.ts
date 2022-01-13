import type { AppState } from './app.reducer'

const AppSelectors = {
  isInitializedSelector: (state: { app: AppState }) => state.app.isInitialized,
  deviceTokenSelector: (state: { app: AppState }) => state.app.deviceToken,
  isFirstLaunchSelector: (state: { app: AppState }) => state.app.isFirstLaunch,
  travelModeSelector: (state: { app: AppState }) => state.app.travelMode,
  // If this contains a value there is an emergency
  emergencyInfoSelector: (state: { app: AppState }) => state.app.emergencyInfo,
  isArrivedSelector: (state: { app: AppState }) => state.app.isArrived,
}

export { AppSelectors }
