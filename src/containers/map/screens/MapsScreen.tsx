import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { layout } from '@components/global-stylesheets'
import { useAppTheme } from '@components/theme'
import {
  BottomSheet,
  Box,
  Button,
  FlexGroup,
  FlexItem,
  Heading,
  IconButton,
  Map,
  Modal,
  Spacer,
  Text,
} from '@internal/components'
import { useAppNavigation } from '@internal/navigation'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AppSelectors } from '@internal/store/app'
import { AppActions, AppThunks } from '@internal/store/app/app.reducer'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'

interface ExitButtonProps {
  onPress: () => void
}

interface FollowUserButtonProps {
  onPress: () => void
  shouldFollowUser: boolean
}

export const MapsScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [shouldFollowUser, setShouldFollowUser] = useState(true)
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const navigation = useAppNavigation()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const emergencyInfo = useAppSelector(AppSelectors.emergencyInfo)
  const dispatchConnection = useAgentSelector(AriesSelectors.dispatchServiceSelector)

  useEffect(() => {
    bottomSheetRef.current?.present()
  }, [])

  const onPressArrived = () => {
    if (dispatchConnection) {
      void dispatch(AppThunks.sendArrived({ connectionId: dispatchConnection.id }))
    }
  }

  const onPressDone = () => {
    bottomSheetRef.current?.close()
    navigation.navigate('FeedbackScreen')
  }

  return (
    <>
      <MapButtonContainer>
        <FollowUserButton onPress={() => setShouldFollowUser(!shouldFollowUser)} shouldFollowUser={shouldFollowUser} />
        <ExitButton onPress={() => setShouldShowModal(true)} />
      </MapButtonContainer>
      <Map shouldFollowUser={shouldFollowUser} setShouldFollowUser={setShouldFollowUser} />
      {emergencyInfo && (
        <BottomSheet bottomSheetModalRef={bottomSheetRef}>
          <Box fill>
            <Spacer size="xxl" />
            <Heading align="center" color="danger">
              {emergencyInfo.emergency.title}
            </Heading>
            <Spacer size="xxxl" />
            <Spacer size="xxxl" />
            <Text align="center">{emergencyInfo.emergency.description}</Text>
            <FlexGroup alignItems="flexEnd" direction="row" justifyContent="spaceEvenly">
              <Box fill>
                <Button onPress={onPressArrived}>Aangekomen</Button>
              </Box>
              <Spacer vertical />
              <Box fill>
                <Button onPress={onPressDone}>Klaar!</Button>
              </Box>
            </FlexGroup>
          </Box>
        </BottomSheet>
      )}
      {shouldShowModal && (
        <Modal
          onAccept={() => {
            void dispatch(AppActions.setHasEmergency({ hasEmergency: false }))
            navigation.navigate('CredentialsScreen')
          }}
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
