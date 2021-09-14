import type { IndicatorSlideProps } from '../components/Slide'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

import { Slide } from '../components/Slide'

import { useAppNavigation } from '@internal/navigation'
import { images } from '@internal/theme/images'

export const LegalScreen: React.FunctionComponent<IndicatorSlideProps> = ({ indicator }) => {
  const { t } = useTranslation()
  const navigation = useAppNavigation()

  const onUnderstandLegal = () => {
    Alert.alert('LEGAL')
    navigation.navigate('CredentialsScreen')
  }

  return (
    <Slide
      image={images.location}
      text={t('feature.onboarding.text.legal')}
      button={{ onPress: () => onUnderstandLegal, text: t('feature.onboarding.actions.understand') }}
      indicator={indicator}
    />
  )
}
