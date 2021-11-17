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
import { AppActions } from '@internal/store/app/app.reducer'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { darkMap, lightMap } from '@internal/utils/mapTheme'

export interface Emergency {
  title: string
  description: string
  travelTime: number
}

const DELTA = {
  latitudeDelta: 0.0025,
  longitudeDelta: 0.0025,
}

export const EmergencyBottomSheet: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useAppNavigation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const activeEmergencyRequest = useAgentSelector(AriesSelectors.activeEmergencyRequest)
  const hasEmergency = useAppSelector(AppSelectors.hasEmergencySelector)
  const emergencyInfo = useAppSelector(AppSelectors.emergencyInfo)
  const { darkMode } = useAppTheme()
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    if (hasEmergency && activeEmergencyRequest) {
      bottomSheetModalRef.current?.present()
    } else {
      bottomSheetModalRef.current?.close()
    }
  }, [activeEmergencyRequest, hasEmergency])

  const onDecline = async () => {
    void dispatch(AppActions.setHasEmergency({ hasEmergency: false }))
    if (activeEmergencyRequest) {
      await dispatch(AppThunks.denyEmergency({ id: activeEmergencyRequest.id }))
    }
  }

  const onAccept = async () => {
    void dispatch(AppActions.setHasEmergency({ hasEmergency: false }))
    if (activeEmergencyRequest) {
      await dispatch(AppThunks.acceptEmergency({ id: activeEmergencyRequest.id }))
      navigation.navigate('MapsScreen')
    }
  }

  if (!emergencyInfo) {
    return <BottomSheet bottomSheetModalRef={bottomSheetModalRef} emergency />
  }

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} emergency>
      <Page>
        <Heading align="center">{emergencyInfo?.emergency.title}</Heading>
        <Spacer size="m" />
        <View style={gutters.largeBMargin}>
          <Text color="textSubdued" align="center">
            {emergencyInfo?.emergency.description}
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
        {emergencyInfo.emergency.travelTime && (
          <View style={gutters.largeTMargin}>
            <Text align="center" weight="bold">
              {(+emergencyInfo.emergency.travelTime / 60).toFixed(0)} MIN
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
