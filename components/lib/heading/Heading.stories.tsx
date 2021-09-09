import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react-native'
import React from 'react'

import { ThemeWrapper, DefaultDecorator } from '../../storybook-utils'
import { FlexGroup, FlexItem } from '../flex'

import { Heading } from './Heading'

export const actions = {
  onPress: action('onPress'),
}

const content = 'Heading'

storiesOf('Heading', module)
  .addDecorator((story) => <DefaultDecorator>{story()}</DefaultDecorator>)
  .add('sizes', () => (
    <ThemeWrapper>
      <FlexGroup direction="column">
        <FlexItem grow={false}>
          <Heading size="xl">{content}</Heading>
        </FlexItem>
        <FlexItem grow={false}>
          <Heading size="l">{content}</Heading>
        </FlexItem>
        <FlexItem grow={false}>
          <Heading size="m">{content}</Heading>
        </FlexItem>
        <FlexItem grow={false}>
          <Heading size="s">{content}</Heading>
        </FlexItem>
      </FlexGroup>
    </ThemeWrapper>
  ))
