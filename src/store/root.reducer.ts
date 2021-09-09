import { combineReducers } from 'redux'

import { AppReducer } from './app'
import { AriesReducer } from './aries'
import { ThemeReducer } from './theme'

const RootReducer = combineReducers({
  theme: ThemeReducer,
  app: AppReducer,
  aries: AriesReducer,
})

export { RootReducer }
