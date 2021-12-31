import type { AsyncThunkOptions } from '../store.types'
import type { H3Resolution } from '@internal/utils'
import type { LocationRegion } from 'expo-location'

import { ApproximateLocationModule } from '@animo/ufo-approximate-location'
import { CurrentRenderContext } from '@react-navigation/native'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LocationGeofencingEventType, startGeofencingAsync } from 'expo-location'
import { defineTask } from 'expo-task-manager'
import Geolocation from 'react-native-geolocation-service'

import { AriesSelectors } from '../aries'

// eslint-disable-next-line import/no-cycle
import { GeoActions } from './geo.reducer'

import { getCurrentIndex, getGeofenceRadius, getHexCenter } from '@internal/utils'

const TASK_NAME = 'APPROXIMATE_LOCATION_FENCE'

const GeoThunks = {
  setupTaskManager: createAsyncThunk<void, void, AsyncThunkOptions>(
    'geo/setupTaskManager',
    async (_, { dispatch, rejectWithValue, getState }) => {
      try {
        const resolution = getState().geo.resolution
        // Set the initial geofence
        await dispatch(GeoThunks.spawnGeofence({ resolution }))

        // Define a new task, aka the geofence spawner
        defineTask(TASK_NAME, (event) => {
          if (event.error) throw new Error(event.error.message)

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // Ignore every event, except for exiting a geofence
          if (event.data.eventType !== LocationGeofencingEventType.Exit) return

          // Get the current resolution
          const currentResolution = getState().geo.resolution

          // Spawn a new geofence
          void (async () => await dispatch(GeoThunks.spawnGeofence({ resolution: currentResolution })))()
        })
      } catch (e) {
        return rejectWithValue(e)
      }
    }
  ),
  spawnGeofence: createAsyncThunk<void, { resolution: H3Resolution }, AsyncThunkOptions>(
    'geo/spawnGeofence',
    ({ resolution }, { dispatch, rejectWithValue }) => {
      try {
        Geolocation.getCurrentPosition(
          (position) => {
            // Get the current position of the device
            const deviceCoordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude }

            // Get the center of the hexagon in which the device is located
            const hexCenter = getHexCenter(deviceCoordinates, resolution)

            // Get the radius of the hexagon so we can spawn a geofence around it
            // This is not a 1:1 mapping, because a hexagon and a circle are not isomorphic
            const radius = getGeofenceRadius(hexCenter, resolution)

            // get the region of the geofence
            const region: LocationRegion = {
              latitude: hexCenter.latitude,
              longitude: hexCenter.longitude,
              radius: radius,
              notifyOnEnter: true,
              notifyOnExit: true,
              identifier: TASK_NAME,
            }

            // Override or start a geofence
            void (async () => startGeofencingAsync(TASK_NAME, [region]))()

            // Get the current hex index
            const hexIndex = getCurrentIndex(hexCenter, resolution)

            dispatch(GeoActions.setHexIndex({ hexIndex }))
            void dispatch(GeoThunks.sendHexIndexToDispatch({ hexIndex }))
          },
          (e) => {
            throw new Error(e.message)
          }
        )
      } catch (e) {
        return rejectWithValue(e)
      }
    }
  ),
  sendHexIndexToDispatch: createAsyncThunk<void, { hexIndex: string }, AsyncThunkOptions>(
    'geo/sendHexIndexToDispatch',
    async ({ hexIndex }, { getState, extra: { agent }, rejectWithValue }) => {
      // Get the connection with the dispatch
      const connectionWithDispatch = AriesSelectors.dispatchServiceSelector(getState().aries)

      // Reject if there is no connection
      if (!connectionWithDispatch) return rejectWithValue('Could not establish a connection with the dispatch')

      // Instanciate a approx. location module
      const alm = agent.injectionContainer.resolve(ApproximateLocationModule)

      // Send the hexIndex to the dispatcher
      await alm.sendApproximateLocation(connectionWithDispatch.id, hexIndex)
    }
  ),
}

export { GeoThunks }
