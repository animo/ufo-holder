import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { BottomButtonBar } from './BottomButtonBar'

import { gutters, layout } from '@components/global-stylesheets'
import { BottomSheet, Heading, Page, Spacer, Text } from '@components/lib'
import { useAppTheme } from '@components/theme'
import { useAppNavigation } from '@internal/navigation'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AppSelectors, AppThunks } from '@internal/store/app'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { sleep } from '@internal/utils'
import { darkMap, lightMap } from '@internal/utils/mapTheme'

const DELTA = {
  latitudeDelta: 0.0025,
  longitudeDelta: 0.0025,
}

export const EmergencyBottomSheet: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useAppNavigation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const connectionWithDispatch = useAgentSelector(AriesSelectors.dispatchServiceSelector)
  const emergencyInfo = useAppSelector(AppSelectors.emergencyInfoSelector)
  const emergencyRequestProofId = useAgentSelector(AriesSelectors.activeEmergencyRequest)
  const { darkMode } = useAppTheme()
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    if (emergencyInfo) {
      bottomSheetModalRef.current?.present()
    } else {
      bottomSheetModalRef.current?.close()
    }
  }, [emergencyInfo])

  const onDecline = async () => {
    if (connectionWithDispatch && emergencyRequestProofId) {
      await dispatch(
        AppThunks.rejectEmergency({ proofId: emergencyRequestProofId, connectionId: connectionWithDispatch.id })
      )
    }
    bottomSheetModalRef.current?.close()
  }

  const onAccept = async () => {
    bottomSheetModalRef.current?.close()
    await sleep(500)
    if (emergencyRequestProofId) {
      await dispatch(AppThunks.acceptEmergency({ proofId: emergencyRequestProofId }))
    }
    navigation.navigate('MapsScreen')
  }

  if (!emergencyInfo) {
    return <BottomSheet bottomSheetModalRef={bottomSheetModalRef} emergency />
  }

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} emergency>
      <Page>
        <Heading align="center">{emergencyInfo.emergency.title}</Heading>
        <Spacer size="m" />
        <View style={gutters.largeBMargin}>
          <Text color="textSubdued" align="center">
            {emergencyInfo.emergency.definition}
          </Text>
        </View>
        <MapView
          customMapStyle={darkMode ? darkMap : lightMap}
          style={layout.fill}
          ref={mapRef}
          initialRegion={{ ...emergencyInfo.coordinate, ...DELTA }}
        >
          <Marker coordinate={emergencyInfo.coordinate} />
        </MapView>
        <Spacer />
        <Text color="textSubdued" align="center">
          {emergencyInfo.emergency.address}
        </Text>
        {emergencyInfo.emergency.travelTime && (
          <View style={gutters.largeTMargin}>
            <Text align="center" weight="bold">
              Reistijd: {(+emergencyInfo.emergency.travelTime / 60).toFixed(0)} min
            </Text>
          </View>
        )}
        <BottomButtonBar
          buttons={[
            { onPress: onDecline, text: t('actions.decline'), color: 'danger' },
            { onPress: onAccept, text: t('actions.accept') },
          ]}
        />
      </Page>
    </BottomSheet>
  )
}
