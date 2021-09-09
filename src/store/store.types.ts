import type { initializeStore } from './initializeStore'
import type { AgentThunkApiConfig } from '@aries-framework/redux-store'
import type { TypedUseSelectorHook } from 'react-redux'

import { useSelector, useDispatch } from 'react-redux'

type Store = ReturnType<typeof initializeStore>['store']

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<Store['getState']>
type AppDispatch = Store['dispatch']

// Typed use selector and dispatch methods from react-redux
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch = () => useDispatch<AppDispatch>()

// Type definitions for createAsyncThunk
type AsyncThunkOptions = {
  dispatch: AppDispatch
  state: RootState
} & AgentThunkApiConfig

export { useAppDispatch, useAppSelector }
export type { RootState, AppDispatch, AsyncThunkOptions, Store }
