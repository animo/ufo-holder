import type { EventUserLocation, MapViewProps } from 'react-native-maps'

import { API_KEY } from '@env'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import MapView, { Circle, Marker, Polygon } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { layout } from '@components/global-stylesheets'
import { Page } from '@components/lib'
import { useAppTheme } from '@components/theme'
import { requestPermission } from '@internal/modules'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AppSelectors, AppThunks } from '@internal/store/app'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { GeoSelectors } from '@internal/store/geo/geo.selector'
import { getGeofenceRadius, getHexCenterByIndex, indexToNeighbourVertices, indexToVertices } from '@internal/utils'
import { darkMap, lightMap } from '@internal/utils/mapTheme'

interface MapProps extends MapViewProps {
  shouldFollowUser: boolean
  setShouldFollowUser: (_: boolean) => void
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

const DELTA = {
  latitudeDelta: 0.004,
  longitudeDelta: 0.004,
}

export const Map: React.FunctionComponent<MapProps> = ({ shouldFollowUser, setShouldFollowUser, ...rest }) => {
  const [userCoordinates, setUserCoordinates] = useState<{ latitude: number; longitude: number } | null>(null)
  const [hasLocationPermissions, setHasLocationPermissions] = useState(true)
  const { darkMode } = useAppTheme()
  const dispatch = useAppDispatch()
  const dispatchConnection = useAgentSelector(AriesSelectors.dispatchServiceSelector)
  const emergencyInfo = useAppSelector(AppSelectors.emergencyInfo)

  const [geocenter, setGeocenter] = useState<Coordinate>({ latitude: 1, longitude: 1 })
  const [georadius, setGeoradius] = useState(0)
  const [vertices, setVertices] = useState<Coordinates>([])
  const [neighbourVertices, setNeighbourVertices] = useState<Coordinates[]>([])
  const hexIndex = useAppSelector(GeoSelectors.hexIndexSelector)
  const resolution = useAppSelector(GeoSelectors.resolutionSelector)

  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    const run = async () => {
      setHasLocationPermissions((await requestPermission('location')) === 'granted')
      Geolocation.getCurrentPosition((position) => {
        const coordinates = { longitude: position.coords.longitude, latitude: position.coords.latitude }
        setUserCoordinates(coordinates)
      })
    }
    void run()
  }, [])

  if (!hasLocationPermissions || !userCoordinates) {
    return <Page center>No Permissions</Page>
  }

  const focusOnUser = () => mapRef.current?.animateToRegion({ ...userCoordinates, ...DELTA }, 1000)

  const onUserLocationChange = (event: EventUserLocation) => {
    if (dispatchConnection) {
      void dispatch(
        AppThunks.pingPreciseLocation({ connectionId: dispatchConnection.id, coordinate: event.nativeEvent.coordinate })
      )
    }
    const coordinates = {
      longitude: event.nativeEvent.coordinate.longitude,
      latitude: event.nativeEvent.coordinate.latitude,
    }
    if (shouldFollowUser) {
      setUserCoordinates(coordinates)
      focusOnUser()
    }

    if (hexIndex) {
      const radius = getGeofenceRadius(coordinates, resolution)
      const center = getHexCenterByIndex(hexIndex)
      const verts = indexToVertices(hexIndex).map((vert) => ({ latitude: vert[0], longitude: vert[1] }))
      const neighbourVerts = indexToNeighbourVertices(hexIndex, 1).map((n) =>
        n.map((i) => ({ latitude: i[0], longitude: i[1] }))
      )

      setGeoradius(radius)
      setGeocenter(center)
      setVertices(verts)
      setNeighbourVertices(neighbourVerts)
    }
  }

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userInterfaceStyle={darkMode ? 'dark' : 'light'}
      onMapReady={focusOnUser}
      {...rest}
    >
      {vertices.length > 0 && (
        <Polygon coordinates={vertices} strokeColor="rgba(0,0,255,1)" fillColor="rgba(0,0,255,0.4)" />
      )}
      {neighbourVertices.length > 0 &&
        neighbourVertices.map((x) => (
          <Polygon key={x[0].longitude} coordinates={x} strokeColor="rgba(0,255,255,1)" fillColor="rgba(0,0,255,0.4)" />
        ))}
      <Circle center={geocenter} radius={georadius} fillColor="rgba(255,0,0,0.4)" strokeColor="rgba(255,0,0,1)" />
      {emergencyInfo && (
        <>
          <Directions origin={userCoordinates} destination={emergencyInfo.coordinate} />
          <Marker coordinate={emergencyInfo.coordinate} />
        </>
      )}
    </MapView>
  )
}

const Directions: React.FunctionComponent<DirectionsProps> = ({ origin, destination }) => {
  const { colors } = useAppTheme()
  const travelMode = useAppSelector(AppSelectors.travelMode)
  return useMemo(
    () => (
      <MapViewDirections
        mode={travelMode}
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
