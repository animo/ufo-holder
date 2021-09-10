import { extendTheme, NativeBaseProvider } from 'native-base'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import { useThemeSwitcher } from './store/theme/useThemeSwitcher'

import { theme as lightTheme, theme as darkTheme } from '@components/theme/themes/light'
import { agentConfig, createAgent } from '@internal/config'
import { ApplicationNavigator } from '@internal/navigation/Application'
import { initializeStore, useAppSelector } from '@internal/store'
import { useAgentListeners } from '@internal/store/aries'
import { ThemeContextProvider } from '@internal/theme'

// Initializes translations
import './translations'

// Create agent instance, initialize store
const agent = createAgent(agentConfig)

// Add reset wallet option to dev menu
if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const { addWalletReset } = require('./utils/dev')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  addWalletReset(agent)
}

const { store, persistor } = initializeStore(agent)

const AppThemeProvider: React.FunctionComponent = ({ children }) => {
  // Listen for light/dark color scheme preferences and update state accordingly
  useThemeSwitcher()

  const themeName = useAppSelector((state) => state.theme.theme) ?? 'light'

  return <ThemeContextProvider themeName={themeName}>{children}</ThemeContextProvider>
}

export const App: React.FunctionComponent = () => {
  // Listens for state changes in the agent and propagates those changes to the redux store
  useAgentListeners(agent, store)

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          <AppThemeProvider>
            <ApplicationNavigator />
          </AppThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}
