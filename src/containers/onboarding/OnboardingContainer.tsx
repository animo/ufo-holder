import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'

import { BiometricsSlide } from './screens/BiometricsSlide'
import { FinishSlide } from './screens/FinishSlide'
import { WelcomeSlide } from './screens/WelcomeSlide'

import { generateAgentKey, storeAgentWalletKey } from '@internal/modules/Keychain'
import { useAppDispatch } from '@internal/store'
import { AppThunks } from '@internal/store/app'

export const OnboardingContainer = () => {
  const ref = useRef<PagerView>(null)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onPressBiometrics = () => {
    Alert.alert('Biometrics', 'Turn on biometrics!', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          await storeAgentWalletKey(generateAgentKey())
          ref.current?.setPage(2)
        },
      },
    ])
  }

  const onPressInitialize = () => {
    void dispatch(AppThunks.newUser())
  }

  const goToPage = (page: number) => {
    ref.current?.setPage(page)
  }

  return (
    <PagerView style={StyleSheet.absoluteFill} initialPage={0} ref={ref} scrollEnabled={false}>
      <WelcomeSlide buttonMessage="Continue" onPressNextSlide={() => goToPage(1)} />
      <BiometricsSlide
        onPressNextSlide={onPressBiometrics}
        buttonMessage={t('feature.onboarding.action.turnOrnBiometrics')}
      />
      <FinishSlide onPressNextSlide={onPressInitialize} buttonMessage={t('feature.onboarding.action.start')} />
    </PagerView>
  )
}
