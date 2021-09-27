import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAppTheme } from '@components/theme'
import { BottomSheet, Box, IconButton, Map, Modal } from '@internal/components'
import { useAppNavigation } from '@internal/navigation'

export const MapsScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    bottomSheetRef.current?.present()
  }, [])

  return (
    <>
      <NoHelp />
      <Map />
      <BottomSheet bottomSheetModalRef={bottomSheetRef} />
    </>
  )
}

const NoHelp = () => {
  const insets = useSafeAreaInsets()
  const { colors } = useAppTheme()
  const navigation = useAppNavigation()
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  return (
    <Box
      style={[
        {
          top: insets.top + 10,
          backgroundColor: colors.background[500],
        },
        styles.container,
      ]}
    >
      <IconButton type="exit-outline" onPress={() => setShowModal(true)} />
      <Modal
        onAccept={() => navigation.navigate('CredentialsScreen')}
        setShowModal={setShowModal}
        showModal={showModal}
        title={t('feature.maps.title.modal')}
        text={t('feature.maps.text.modal')}
      />
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
