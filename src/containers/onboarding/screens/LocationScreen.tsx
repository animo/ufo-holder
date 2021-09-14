import type { IndicatorSlideProps } from '../components/Slide'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Slide } from '../components/Slide'

import { images } from '@internal/theme/images'

type LocationScreenProps = IndicatorSlideProps & {
  onPress: () => void
}

export const LocationScreen: React.FunctionComponent<LocationScreenProps> = ({ onPress, indicator }) => {
  const { t } = useTranslation()

  return (
    <Slide
      image={images.location}
      text={t('feature.onboarding.text.location')}
      button={{ onPress: onPress, text: t('feature.onboarding.actions.setPermissions') }}
      indicator={indicator}
    />
  )
}
