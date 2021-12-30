/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { Coordinate } from '@internal/components/Map'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { geoToH3, h3ToGeo, h3ToGeoBoundary } from 'h3-reactnative'

export type H3Resolution = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export const getCurrentIndex = (coordinate: Coordinate, resolution: H3Resolution): string =>
  geoToH3(coordinate.latitude, coordinate.longitude, resolution)

/**
 * Get the biggest radius around a hexagon based on the devices latlng
 */
export const getGeofenceRadius = (coordinate: Coordinate, resolution: H3Resolution) => {
  const index = getCurrentIndex(coordinate, resolution)
  const hexCenter = getHexCenter(coordinate, resolution)
  const vertices: number[][] = h3ToGeoBoundary(index)

  // Return the longest radius
  return Math.max(
    ...vertices.map((v) =>
      pointDistance(
        { latitude: hexCenter.latitude, longitude: hexCenter.longitude },
        { latitude: v[0], longitude: v[1] }
      )
    )
  )
}

/**
 * Get the center latlng of a hexagon
 */
export const getHexCenter = (coordinate: Coordinate, resolution: H3Resolution): Coordinate => {
  const index = getCurrentIndex(coordinate, resolution)
  const [latitude, longitude] = h3ToGeo(index)
  return { latitude, longitude }
}

/**
 * Calculate the distance between two laglng coordinates
 */
export const pointDistance = (p1: Coordinate, p2: Coordinate) => {
  const R = 6371e3 // earth's radius
  const radiansLat1 = (p1.latitude * Math.PI) / 180
  const radiansLat2 = (p2.latitude * Math.PI) / 180

  const delta1 = ((p2.latitude - p1.latitude) * Math.PI) / 180
  const delta2 = ((p2.longitude - p1.longitude) * Math.PI) / 180

  const a =
    Math.sin(delta1 / 2) * Math.sin(delta1 / 2) +
    Math.cos(radiansLat1) * Math.cos(radiansLat2) * Math.sin(delta2 / 2) * Math.sin(delta2 / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // distance in meters
}
