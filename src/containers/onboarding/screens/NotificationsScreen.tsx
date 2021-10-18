import type { IndicatorSlideProps } from '../components/Slide'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Slide } from '../components/Slide'

import { images } from '@internal/theme/images'
import { requestPlatform } from '@internal/utils'

type NotificationScreenProps = IndicatorSlideProps & {
  onPress: () => void
}

export const NotificationScreen: React.FunctionComponent<NotificationScreenProps> = ({ onPress }) => {
  const { t } = useTranslation()
  const buttonText =
    requestPlatform() === 'android'
      ? t('feature.onboarding.actions.understand')
      : t('feature.onboarding.actions.setNotificationPermissions')

  return (
    <Slide
      image={images.noData}
      text={t('feature.onboarding.text.notifications')}
      button={{ onPress, text: buttonText }}
    />
  )
}
