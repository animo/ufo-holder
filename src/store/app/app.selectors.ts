import type { AppState } from './app.reducer'

const AppSelectors = {
  isInitializedSelector: (state: { app: AppState }) => state.app.isInitialized,
  hasEmergencySelector: (state: { app: AppState }) => state.app.hasEmergency,
  deviceTokenSelector: (state: { app: AppState }) => state.app.deviceToken,
  isFirstLaunchSelector: (state: { app: AppState }) => state.app.isFirstLaunch,
  emergencyInfo: (state: { app: AppState }) => state.app.emergencyInfo,
}

export { AppSelectors }
