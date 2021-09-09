import type { Agent } from '@aries-framework/core'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import { RootReducer } from './root.reducer'

export function initializeStore(agent: Agent) {
  // Set up persistence
  const persistedReducer = persistReducer(
    {
      key: 'root',
      storage: AsyncStorage,
      whitelist: ['theme'],
    },
    RootReducer
  )

  // Initialize store
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware({
        serializableCheck: false,
        // TODO: temporarily disabled. Need an easy way to ignore all agents actions/state
        // serializableCheck: {
        //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // },
        thunk: {
          extraArgument: {
            agent,
          },
        },
      })

      if (__DEV__ && !process.env.JEST_WORKER_ID) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
        const createDebugger = require('redux-flipper').default
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        middlewares.push(createDebugger())
      }

      return middlewares
    },
  })

  const persistor = persistStore(store)

  return { store, persistor }
}
