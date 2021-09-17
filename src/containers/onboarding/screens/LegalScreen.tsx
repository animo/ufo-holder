import React from 'react'
import { useTranslation } from 'react-i18next'

import { Slide } from '../components/Slide'

import { images } from '@internal/theme/images'

type LegalScreenProps = {
  onPress: () => void
}

export const LegalScreen: React.FunctionComponent<LegalScreenProps> = ({ onPress }) => {
  const { t } = useTranslation()

  return (
    <Slide
      image={images.legal}
      text={t('feature.onboarding.text.legal')}
      button={{ onPress, text: t('feature.onboarding.actions.understand') }}
    />
  )
}
