import type { SlideProps } from '../components/Slide'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Slide } from '../components/Slide'

import { FlexGroup, FlexItem, Heading, Icon, Spacer, Text } from '@components/lib'

export const BiometricsSlide: React.FunctionComponent<SlideProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Slide {...props}>
      <FlexGroup alignItems="center">
        <Spacer size="xxl" />
        <FlexItem grow={false}>
          <Icon iconType="finger-print-outline" iconSize={250} />
        </FlexItem>
        <Spacer size="xxl" />

        <FlexItem grow={false}>
          <Heading align="center">{t('feature.onboarding.biometrics.title')}</Heading>
          <Spacer size="m" />

          <Text size="l" align="center">
            {t('feature.onboarding.biometrics.text')}
          </Text>
        </FlexItem>
      </FlexGroup>
    </Slide>
  )
}
