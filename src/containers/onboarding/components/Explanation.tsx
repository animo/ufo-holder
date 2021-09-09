import React from 'react'

import { Icon, Heading, Text, FlexGroup, Spacer } from '@components/lib'

interface ExplanationProps {
  iconType: string
  title: string
  text: string
}

export const Explanation: React.FunctionComponent<ExplanationProps> = ({ iconType, text, title }) => (
  <FlexGroup flex={false}>
    <FlexGroup direction="row" flex={false} alignItems="center">
      <Icon iconType={iconType} iconSize="xxxl" />
      <Spacer vertical size="s" />
      <Heading>{title}</Heading>
    </FlexGroup>
    <Spacer size="s" />
    <Text>{text}</Text>
  </FlexGroup>
)
