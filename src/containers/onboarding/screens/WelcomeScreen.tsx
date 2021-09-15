import type { IndicatorSlideProps } from '../components/Slide'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Slide } from '../components/Slide'

import { images } from '@internal/theme/images'

export const WelcomeScreen: React.FunctionComponent<IndicatorSlideProps> = ({ indicator }) => {
  const { t } = useTranslation()
  return <Slide image={images.welcome} text={t('feature.onboarding.text.welcome')} indicator={indicator} />
}
