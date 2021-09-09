import type { SlideProps } from '../components/Slide'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Slide } from '../components/Slide'

import { FlexGroup, FlexItem, Heading, Icon, Spacer, Text } from '@components/lib'

export const FinishSlide: React.FunctionComponent<SlideProps> = (props) => {
  const { t } = useTranslation()

  return (
    <Slide {...props}>
      <FlexGroup alignItems="center">
        <Spacer size="xxl" />
        <FlexItem grow={false}>
          <Icon iconType="rocket-outline" iconSize={250} />
        </FlexItem>
        <Spacer size="xxl" />
        <FlexItem grow={false}>
          <Heading align="center">{t('feature.onboarding.finished.title')}</Heading>
          <Spacer size="m" />

          <Text size="l" align="center">
            {t('feature.onboarding.finished.text')}
          </Text>
        </FlexItem>
      </FlexGroup>
    </Slide>
  )
}
