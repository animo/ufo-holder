import type { BarCodeScanningResult } from 'expo-camera'

import { ConnectionInvitationMessage } from '@aries-framework/core'
import { ConnectionThunks } from '@aries-framework/redux-store'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BarCodeMask from 'react-native-barcode-mask'
import Toast from 'react-native-toast-message'

import { FlexGroup, FlexItem, Heading, Text } from '@components/lib'
import { Camera } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { sleep } from '@internal/utils/sleep'

export const InvitationQrScannerScreen: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isInvitationScanned, setIsInvitationScanned] = useState(false)
  const navigation = useAppStackNavigation()

  const onGoBack = () => {
    navigation.goBack()
  }

  const onBarCodeRead = async (event: BarCodeScanningResult) => {
    if (isInvitationScanned) return
    const reg = new RegExp(/c_i=/)

    if (reg.test(event.data)) {
      setIsInvitationScanned(true)
      await onInvitationScanned(event)
    } else {
      setIsInvitationScanned(true)
      Toast.show({ type: 'error', text1: 'Not a valid invitation' })
      await sleep(3000)
      setIsInvitationScanned(false)
    }
  }

  const onInvitationScanned = async (event: BarCodeScanningResult) => {
    if (event.data) {
      void dispatch(
        ConnectionThunks.receiveInvitation({
          invitation: await ConnectionInvitationMessage.fromUrl(event.data),
          config: { autoAcceptConnection: true },
        })
      )
    }
    onGoBack()
  }

  return (
    <Camera onBarCodeScanned={onBarCodeRead}>
      <BarCodeMask showAnimatedLine={false} edgeBorderWidth={0} height={280} />
      <FlexGroup direction="column">
        <FlexItem alignItems="center" justifyContent="center">
          <Heading color="white" size="m">
            {t('feature.barcodeScanner.title')}
          </Heading>
        </FlexItem>
        <FlexItem grow={2} />
        <FlexItem justifyContent="flex-start" alignItems="center">
          <Text onPress={onGoBack} color="white">
            {t('action.cancel')}
          </Text>
        </FlexItem>
      </FlexGroup>
    </Camera>
  )
}
