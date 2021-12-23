/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Coordinate } from '@internal/components/Map'
import type { LocationRegion } from 'expo-location'

import { startGeofencingAsync, LocationGeofencingEventType, stopGeofencingAsync } from 'expo-location'
import * as TaskManager from 'expo-task-manager'

import { getGeofenceRadius } from './hthree'

const TASK_NAME = 'APPROXIMATE_LOCATION_FENCE'
// Mocked location
const LOC = { longitude: 5, latitude: 52 }
// Mocked resolution
const RESOLUTION = 5
// Mocked radius
const RADIUS = getGeofenceRadius(LOC, RESOLUTION)

export const startGeoFence = async (center: Coordinate, radius: number) => {
  const region: LocationRegion = {
    latitude: center.latitude,
    longitude: center.longitude,
    radius: radius,
    notifyOnEnter: true,
    notifyOnExit: true,
    identifier: TASK_NAME,
  }

  await startGeofencingAsync(TASK_NAME, [region])
}

export const stopGeoFence = stopGeofencingAsync

export const setupGeoFencingCallback = async () => {
  await startGeoFence(LOC, RADIUS)
  TaskManager.defineTask(TASK_NAME, (event) => {
    if (event.error) {
      // check `error.message` for more details.
      return
    }
    // @ts-ignore
    if (event.data.eventType === LocationGeofencingEventType.Exit) {
      // @ts-ignore
      console.log("You've left region:", event.data.region)

      // This kinda loops a lot

      // stop current
      void (async () => stopGeofencingAsync(TASK_NAME))()
      // start new
      void (async () =>
        //@ts-ignore
        startGeoFence({ latitude: event.data.region.latitude, longitude: event.data.region.longitude }, RADIUS))()
    }
  })
}
