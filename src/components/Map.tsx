import type { MapViewProps } from 'react-native-maps'

import { API_KEY } from '@env'
import React, { useEffect, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { layout } from '@components/global-stylesheets'
import { useAppTheme } from '@components/theme'
import { darkMap, lightMap } from '@internal/utils/mapTheme'

interface MapProps extends MapViewProps {
  shouldFollowUser: boolean
  setShouldFollowUser: (_: boolean) => void
  userCoordinate: Coordinate
}

interface DirectionsProps {
  origin: Coordinate
  destination: Coordinate
}

export interface Coordinate {
  latitude: number
  longitude: number
}

export type Coordinates = Coordinate[]

// TODO: SAMPLE
const EMERGENCY = {
  latitude: 52.0869214592593,
  longitude: 5.12363309259259,
}

const DELTA = {
  latitudeDelta: 0.0025,
  longitudeDelta: 0.0025,
}

export const Map: React.FunctionComponent<MapProps> = ({
  shouldFollowUser,
  setShouldFollowUser,
  userCoordinate,
  ...rest
}) => {
  const { darkMode } = useAppTheme()

  const mapRef = useRef<MapView>(null)

  const focusOnUser = () => mapRef.current?.animateToRegion({ ...userCoordinate, ...DELTA }, 2000)

  const onUserLocationChange = () => {
    if (shouldFollowUser) {
      focusOnUser()
    }
  }

  useEffect(() => {
    if (shouldFollowUser) {
      focusOnUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFollowUser])

  return (
    <MapView
      onPanDrag={() => setShouldFollowUser(false)}
      onUserLocationChange={onUserLocationChange}
      showsUserLocation
      followsUserLocation={shouldFollowUser}
      userLocationPriority="high"
      userLocationUpdateInterval={5000}
      userLocationFastestInterval={1000}
      showsBuildings={false}
      showsCompass={false}
      showsMyLocationButton={false}
      customMapStyle={darkMode ? darkMap : lightMap}
      style={[layout.fullSize, styles.map]}
      ref={mapRef}
      userInterfaceStyle={darkMode ? 'dark' : 'light'}
      onMapReady={focusOnUser}
      {...rest}
    >
      <Directions origin={userCoordinate} destination={EMERGENCY} />
      <Marker coordinate={EMERGENCY} />
    </MapView>
  )
}

const Directions: React.FunctionComponent<DirectionsProps> = ({ origin, destination }) => {
  const { colors } = useAppTheme()
  return useMemo(
    () => (
      <MapViewDirections
        // TODO: Do we want to select the mode when accepting the emergency?
        mode="WALKING"
        apikey={API_KEY}
        origin={origin}
        destination={destination}
        strokeWidth={5}
        strokeColor={colors.primary[500]}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}

const styles = StyleSheet.create({
  map: {
    zIndex: -1,
  },
})
