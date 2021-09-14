import type { IndicatorSlideProps } from '../components/Slide'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Slide } from '../components/Slide'

import { images } from '@internal/theme/images'

export const CredentialsScreen: React.FunctionComponent<IndicatorSlideProps> = ({ indicator }) => {
  const { t } = useTranslation()
  return <Slide image={images.credentials} text={t('feature.onboarding.text.credentials')} indicator={indicator} />
}
