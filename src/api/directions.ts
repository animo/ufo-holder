import type { Coordinate } from '@internal/components/Map'
import type { MapViewDirectionsMode } from 'react-native-maps-directions'

import { API_KEY } from '@env'

export const getTravelTime = async (
  origin: Coordinate,
  destination: Coordinate,
  mode: MapViewDirectionsMode = 'WALKING'
): Promise<number | undefined> => {
  const serializeCoordinate = (latitude: number, longitude: number) => `${latitude},${longitude}`

  const serializedOrigin = serializeCoordinate(origin.latitude, origin.longitude)
  const serializedDestination = serializeCoordinate(destination.latitude, destination.longitude)

  const get = fetch(
    `https://maps.googleapis.com/maps/api/directions/json?key=${API_KEY}&mode=${mode.toLowerCase()}&origin=${serializedOrigin}&destination=${serializedDestination}`
  )

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const res = await (await get).json()

  let travelTimeInSeconds = 0

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (res.routes[0] && res.routes[0].legs) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    travelTimeInSeconds = res.routes[0].legs[0].duration.value
  }

  if (travelTimeInSeconds) {
    return travelTimeInSeconds
  }
  return undefined
}
