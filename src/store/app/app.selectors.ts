import type { AppState } from './app.reducer'

const AppSelectors = {
  isInitializedSelector: (state: { app: AppState }) => state.app.isInitialized,
}

export { AppSelectors }
