import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { BottomButtonBar } from './BottomButtonBar'

import { gutters, layout } from '@components/global-stylesheets'
import { BottomSheet, Heading, Page, Spacer, Text } from '@components/lib'
import { useAppTheme } from '@components/theme'
import { Box, Map } from '@internal/components'
import { useAppNavigation } from '@internal/navigation'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AppSelectors, AppThunks } from '@internal/store/app'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { darkMap, lightMap } from '@internal/utils/mapTheme'

export interface EmergencyBottomSheetProps {
  title: string
  subtitle: string
}

const DELTA = {
  latitudeDelta: 0.0025,
  longitudeDelta: 0.0025,
}

export const EmergencyBottomSheet: React.FunctionComponent<EmergencyBottomSheetProps> = ({ title, subtitle }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const hasEmergency = useAppSelector(AppSelectors.hasEmergencySelector)
  const navigation = useAppNavigation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const activeProofRequest = useAgentSelector(AriesSelectors.notSharedProofsSelector)[0]
  const emergencyInfo = useAppSelector(AppSelectors.emergencyInfo)
  const { darkMode } = useAppTheme()
  const mapRef = useRef<MapView>(null)

  /**
   * @todo proper decline of an emergency
   */
  const onDecline = () => {
    //void dispatch(AppThunks.denyEmergency({ id: activeProofRequest.id }))
    void dispatch(AppThunks.emergency({ emergency: false }))
  }

  /**
   * @todo proper acceptance of an emergency
   */
  const onAccept = () => {
    navigation.navigate('MapsScreen')
    //void dispatch(AppThunks.acceptEmergency({ id: activeProofRequest.id }))
    void dispatch(AppThunks.emergency({ emergency: false }))
  }

  useEffect(() => {
    if (hasEmergency && emergencyInfo?.coordinate) {
      bottomSheetModalRef.current?.present()
    }
    bottomSheetModalRef.current?.close()
  }, [bottomSheetModalRef, emergencyInfo?.coordinate, hasEmergency])

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
        <View style={gutters.largeTMargin}>
          <Text align="center" weight="bold">
            {(emergencyInfo.emergency.travelTime / 60).toFixed(0)} MIN
          </Text>
        </View>
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
