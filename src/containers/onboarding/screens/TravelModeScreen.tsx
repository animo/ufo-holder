import type { IndicatorSlideProps } from '../components/Slide'
import type { MapViewDirectionsMode } from 'react-native-maps-directions'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { DropdownSlide } from '../components/Slide'

type RegisterScreenprops = IndicatorSlideProps & {
  onSelect: (_: MapViewDirectionsMode) => void
  onPress: () => void
  selected: string
}

export const TravelModeScreen: React.FunctionComponent<RegisterScreenprops> = ({
  onSelect,
  indicator,
  selected,
  onPress,
}) => {
  const { t } = useTranslation()
  return (
    <DropdownSlide
      text={t('feature.onboarding.text.travelMode')}
      indicator={indicator}
      onSelect={onSelect}
      selected={selected}
      button={{ text: t('feature.onboarding.actions.selectTravelMode'), onPress }}
    />
  )
}
