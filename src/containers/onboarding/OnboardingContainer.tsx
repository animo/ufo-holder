import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'

import { FinishSlide } from './screens/FinishSlide'
import { WelcomeSlide } from './screens/WelcomeSlide'

import { useAppDispatch } from '@internal/store'
import { AppThunks } from '@internal/store/app'

export const OnboardingContainer = () => {
  const ref = useRef<PagerView>(null)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onPressInitialize = () => {
    void dispatch(AppThunks.newUser())
  }

  const goToPage = (page: number) => {
    ref.current?.setPage(page)
  }

  return (
    <PagerView style={StyleSheet.absoluteFill} initialPage={0} ref={ref} scrollEnabled={false}>
      <WelcomeSlide buttonMessage="Continue" onPressNextSlide={() => goToPage(1)} />
      <FinishSlide onPressNextSlide={onPressInitialize} buttonMessage={t('feature.onboarding.action.start')} />
    </PagerView>
  )
}
