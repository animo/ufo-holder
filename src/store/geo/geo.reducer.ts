import type { H3Resolution } from '@internal/utils'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import { GeoSelectors } from './geo.selector'
// eslint-disable-next-line import/no-cycle
import { GeoThunks } from './geo.thunks'

export interface GeoState {
  // H3 index of where the device currently is
  hexIndex?: string

  // H3 resolution for the hexagons
  resolution: H3Resolution
}

const initialState: GeoState = {
  resolution: 9,
}

const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setHexIndex(state, action: PayloadAction<{ hexIndex: string }>) {
      state.hexIndex = action.payload.hexIndex
    },
    // MUST ALSO UPDATE THE HEXINDEX
    setResolution(state, action: PayloadAction<{ resolution: H3Resolution }>) {
      state.resolution = action.payload.resolution
    },
  },
})

const { reducer, actions } = geoSlice
export { GeoThunks, reducer as GeoReducer, actions as GeoActions, GeoSelectors }
