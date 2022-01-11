import type { IndicatorSlideProps } from '../components/Slide'

import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Slide } from '../components/Slide'

import { Page, Text } from '@internal/components'

export const LoadingScreen: React.FunctionComponent<IndicatorSlideProps> = ({ indicator }) => {
  return (
    <Slide indicator={indicator}>
      <Page center>
        <ActivityIndicator size="large" color="#0099FF" />
        <Text>Applicatie initialiseren</Text>
      </Page>
    </Slide>
  )
}
