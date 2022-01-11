import type { IndicatorSlideProps } from '../components/Slide'

import React from 'react'

import { Slide } from '../components/Slide'

import { images } from '@internal/theme/images'

export const AppScreen: React.FunctionComponent<IndicatorSlideProps> = ({ indicator }) => {
  return <Slide image={images.logo} text="Binnen Bereik" indicator={indicator} />
}
