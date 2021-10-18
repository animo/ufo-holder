import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { layout } from '@components/global-stylesheets'
import { useAppTheme } from '@components/theme'
import { BottomSheet, Box, IconButton, Map, Modal } from '@internal/components'
import { useAppNavigation } from '@internal/navigation'

interface ExitButtonProps {
  onPress: () => void
}

interface FollowUserButtonProps {
  onPress: () => void
  shouldFollowUser: boolean
}

export const MapsScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [shouldFollowUser, setShouldFollowUser] = useState(false)
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const navigation = useAppNavigation()
  const { t } = useTranslation()

  useEffect(() => {
    bottomSheetRef.current?.present()
  }, [])

  return (
    <>
      <MapButtonContainer>
        <FollowUserButton onPress={() => setShouldFollowUser(!shouldFollowUser)} shouldFollowUser={shouldFollowUser} />
        <ExitButton onPress={() => setShouldShowModal(true)} />
      </MapButtonContainer>
      <Map shouldFollowUser={shouldFollowUser} setShouldFollowUser={setShouldFollowUser} />
      <BottomSheet bottomSheetModalRef={bottomSheetRef} />
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
  <IconButton type="person-outline" onPress={onPress} color={shouldFollowUser ? 'success' : 'danger'} />
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
