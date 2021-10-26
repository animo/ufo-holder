import type { IndicatorSlideProps } from '../components/Slide'
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { FormSlide } from '../components/Slide'

type RegisterScreenprops = IndicatorSlideProps & {
  onPress: () => void
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

export const RegisterScreen: React.FunctionComponent<RegisterScreenprops> = ({ indicator, onPress, onChange }) => {
  const { t } = useTranslation()
  return (
    <FormSlide
      text={t('feature.onboarding.text.register')}
      indicator={indicator}
      button={{ text: t('feature.onboarding.actions.register'), onPress }}
      onChange={onChange}
    />
  )
}
