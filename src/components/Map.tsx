import type { EventUserLocation, MapViewProps } from 'react-native-maps'

import { API_KEY } from '@env'
import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { layout } from '@components/global-stylesheets'
import { useAppTheme } from '@components/theme'
import { darkMap, lightMap } from '@internal/utils/mapTheme'

export type MapProps = MapViewProps

export interface Coordinate {
  latitude: number
  longitude: number
}

export type Coordinates = Coordinate[]

const LATITUDE_DELTA = 0.003
const LONGITUDE_DELTA = 0.003

const CURRENT_LOCATION = {
  latitude: 52.0905855,
  longitude: 5.1060915,
}

const EMERGENCY = {
  latitude: 52.0869214592593,
  longitude: 5.12363309259259,
}

const onUserLocationChange = (coordinate: EventUserLocation) => {
  // TODO
}

export const Map: React.FunctionComponent<MapProps> = ({ ...rest }) => {
  const { colors, darkMode } = useAppTheme()

  const mapRef = useRef<MapView>(null)

  return (
    <MapView
      initialRegion={{
        ...CURRENT_LOCATION,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      customMapStyle={darkMode ? darkMap : lightMap}
      style={[layout.fullSize, styles.map]}
      ref={mapRef}
      showsUserLocation
      userInterfaceStyle={darkMode ? 'dark' : 'light'}
      userLocationUpdateInterval={2000}
      followsUserLocation
      showsMyLocationButton={false}
      onUserLocationChange={onUserLocationChange}
      onMapReady={() => mapRef.current?.fitToCoordinates([CURRENT_LOCATION])}
      {...rest}
    >
      <MapViewDirections
        // TODO: Do we want to select the mode when accepting the emergency?
        mode="WALKING"
        apikey={API_KEY}
        origin={CURRENT_LOCATION}
        destination={EMERGENCY}
        strokeWidth={5}
        strokeColor={colors.primary[500]}
      />
      <Marker coordinate={EMERGENCY} />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    zIndex: -1,
  },
})
