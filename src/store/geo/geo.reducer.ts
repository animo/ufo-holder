import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import { GeoSelectors } from './geo.selector'
// eslint-disable-next-line import/no-cycle
import { GeoThunks } from './geo.thunks'

export interface GeoState {
  // H3 index of where the device currently is
  hexIndex?: string
}

const initialState: GeoState = {}

const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setHexIndex(state, action: PayloadAction<{ hexIndex: string }>) {
      state.hexIndex = action.payload.hexIndex
    },
  },
})

const { reducer, actions } = geoSlice
export { GeoThunks, reducer as GeoReducer, actions as GeoActions, GeoSelectors }
