import type { AppState } from './app.reducer'

const AppSelectors = {
  isInitializedSelector: (state: { app: AppState }) => state.app.isInitialized,
  hasEmergencySelector: (state: { app: AppState }) => state.app.hasEmergency,
}

export { AppSelectors }
