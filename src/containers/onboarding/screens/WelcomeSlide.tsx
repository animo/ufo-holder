import type { SlideProps } from '../components/Slide'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Slide } from '../components/Slide'

import { FlexItem, Icon, Heading, Text, Spacer, FlexGroup } from '@components/lib'

export const WelcomeSlide: React.FunctionComponent<SlideProps> = (props) => {
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
          <Heading align="center">{t('feature.onboarding.welcome.title')}</Heading>
          <Spacer size="m" />

          <Text size="l" align="center">
            {t('feature.onboarding.welcome.text')}
          </Text>
        </FlexItem>
      </FlexGroup>
    </Slide>
  )
}
