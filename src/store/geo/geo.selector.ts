import type { GeoState } from './geo.reducer'

const GeoSelectors = {
  hexIndexSelector: (state: { geo: GeoState }) => state.geo.hexIndex,
}

export { GeoSelectors }
