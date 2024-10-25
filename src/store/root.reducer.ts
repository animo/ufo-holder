import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/lib/persistReducer'

import { AppReducer } from './app'
import { AriesReducer } from './aries'
import { ThemeReducer } from './theme'

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['isFirstLaunch', 'deviceToken', 'emergencyInfo', 'hasEmergency'],
}

const RootReducer = combineReducers({
  theme: ThemeReducer,
  app: persistReducer(appPersistConfig, AppReducer),
  aries: AriesReducer,
})

export { RootReducer }
