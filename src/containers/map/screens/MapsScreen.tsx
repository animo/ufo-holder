import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { layout } from '@components/global-stylesheets'
import { useAppTheme } from '@components/theme'
import { BottomSheet, Box, IconButton, Map, Modal, NoPermissions, Page, Text } from '@internal/components'
import { requestPermission } from '@internal/modules'
import { useAppNavigation } from '@internal/navigation'

interface ExitButtonProps {
  onPress: () => void
}

interface FollowUserButtonProps {
  onPress: () => void
  shouldFollowUser: boolean
}

export const MapsScreen = () => {
  const [userCoordinate, setUserCoordinate] = useState<{ latitude: number; longitude: number } | null>(null)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [shouldFollowUser, setShouldFollowUser] = useState(true)
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [hasPermissions, setHasPermissions] = useState(true)
  const navigation = useAppNavigation()
  const { t } = useTranslation()

  useEffect(() => {
    let watchID: number

    const run = async () => {
      watchID = Geolocation.watchPosition(
        (position) => {
          setUserCoordinate({ longitude: position.coords.longitude, latitude: position.coords.latitude })
        },
        // eslint-disable-next-line no-console
        (e) => console.error(`An error occurred while getting the data: ${e.message}`),
        { enableHighAccuracy: true, fastestInterval: 2000, interval: 2000 }
      )
      setHasPermissions((await requestPermission('location')) === 'granted')
    }

    void run()
    // TODO: bottomsheet does not show on initial load because the emergency unmounts the global bottomsheet
    bottomSheetRef.current?.present()

    return () => Geolocation.clearWatch(watchID)
  }, [])

  if (!hasPermissions) {
    return <NoPermissions permission="location" />
  }

  if (!userCoordinate) {
    return (
      <Page center>
        <Text>{t('feature.maps.text.noLocation')}</Text>
      </Page>
    )
  }

  return (
    <>
      <MapButtonContainer>
        <FollowUserButton onPress={() => setShouldFollowUser(!shouldFollowUser)} shouldFollowUser={shouldFollowUser} />
        <ExitButton onPress={() => setShouldShowModal(true)} />
      </MapButtonContainer>
      <BottomSheet bottomSheetModalRef={bottomSheetRef} />
      <Map
        shouldFollowUser={shouldFollowUser}
        setShouldFollowUser={setShouldFollowUser}
        userCoordinate={userCoordinate}
      />
      {shouldShowModal && (
        <Modal
          onAccept={() => navigation.navigate('CredentialsScreen')}
          setShowModal={setShouldShowModal}
          showModal={shouldShowModal}
          title={t('feature.maps.title.modal')}
          text={t('feature.maps.text.modal')}
        />
      )}
    </>
  )
}

const ExitButton: React.FunctionComponent<ExitButtonProps> = ({ onPress }) => (
  <IconButton type="exit-outline" onPress={onPress} />
)

const FollowUserButton: React.FunctionComponent<FollowUserButtonProps> = ({ onPress, shouldFollowUser }) => (
  <IconButton type="locate-outline" onPress={onPress} color={shouldFollowUser ? 'success' : 'danger'} />
)

const MapButtonContainer: React.FunctionComponent = ({ children }) => {
  const insets = useSafeAreaInsets()
  const { colors } = useAppTheme()

  return (
    <Box
      style={[
        {
          top: insets.top + 10,
          backgroundColor: colors.background[500],
        },
        styles.container,
        layout.row,
      ]}
    >
      {children}
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
    borderRadius: 7,
  },
})
