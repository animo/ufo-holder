import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react-native'
import React from 'react'

import { ThemeWrapper, DefaultDecorator } from '../../storybook-utils'
import { FlexGroup, FlexItem } from '../flex'

import { Text } from './Text'

export const actions = {
  onPress: action('onPress'),
}

const loremIpsum = 'Lorem ipsum'

storiesOf('Text', module)
  .addDecorator((story) => <DefaultDecorator>{story()}</DefaultDecorator>)
  .add('sizes', () => (
    <ThemeWrapper>
      <FlexGroup direction="column">
        <FlexItem grow={false}>
          <Text size="m" color="text">
            {loremIpsum}
          </Text>
        </FlexItem>
        <FlexItem grow={false}>
          <Text size="s">{loremIpsum}</Text>
        </FlexItem>
        <FlexItem grow={false}>
          <Text size="xs">{loremIpsum}</Text>
        </FlexItem>
      </FlexGroup>
    </ThemeWrapper>
  ))
  .add('variants', () => (
    <ThemeWrapper>
      <FlexGroup direction="column">
        <FlexItem>
          <Text color="text">{loremIpsum}</Text>
        </FlexItem>
        <FlexItem>
          <Text color="textSubdued">{loremIpsum}</Text>
        </FlexItem>
        <FlexItem>
          <Text color="warning">{loremIpsum}</Text>
        </FlexItem>
        <FlexItem>
          <Text color="danger">{loremIpsum}</Text>
        </FlexItem>
      </FlexGroup>
    </ThemeWrapper>
  ))
