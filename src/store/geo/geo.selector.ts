import type { GeoState } from './geo.reducer'

const GeoSelectors = {
  hexIndexSelector: (state: { geo: GeoState }) => state.geo.hexIndex,
  resolutionSelector: (state: { geo: GeoState }) => state.geo.resolution,
}

export { GeoSelectors }
