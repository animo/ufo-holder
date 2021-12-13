import type { Coordinate } from '@internal/components/Map'

import { API_KEY } from '@env'

export const getTravelTime = async (origin: Coordinate, destination: Coordinate): Promise<number | undefined> => {
  const serializeCoordinate = (latitude: number, longitude: number) => `${latitude},${longitude}`

  const mode = 'walking'
  const serializedOrigin = serializeCoordinate(origin.latitude, origin.longitude)
  const serializedDestination = serializeCoordinate(destination.latitude, destination.longitude)

  const get = fetch(
    `https://maps.googleapis.com/maps/api/directions/json?key=${API_KEY}&mode=${mode}&origin=${serializedOrigin}&destination=${serializedDestination}`
  )

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const res = await (await get).json()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  const travelTimeInSeconds = res.routes[0].legs[0].duration.value

  if (travelTimeInSeconds) {
    return travelTimeInSeconds as number
  }
  return undefined
}
