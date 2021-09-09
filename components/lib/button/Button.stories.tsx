import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react-native'
import React from 'react'

import { ThemeWrapper, DefaultDecorator } from '../../storybook-utils'
import { FlexGroup, FlexItem } from '../flex'

import { Button } from './Button'

export const actions = {
  onPress: action('onPress'),
}

storiesOf('Button', module)
  .addDecorator((story) => <DefaultDecorator>{story()}</DefaultDecorator>)
  .add('default', () => (
    <ThemeWrapper>
      <FlexGroup direction="column">
        <FlexItem grow={false}>
          <Button color="primary" {...actions}>
            Coolio
          </Button>
        </FlexItem>
        <FlexItem grow={false}>
          <Button color="secondary" {...actions}>
            Coolio
          </Button>
        </FlexItem>
        <FlexItem grow={false}>
          <Button color="warning" {...actions}>
            Coolio
          </Button>
        </FlexItem>
        <FlexItem grow={false}>
          <Button color="danger" {...actions}>
            Coolio
          </Button>
        </FlexItem>
        <FlexItem grow={false}>
          <Button variant="plain" {...actions}>
            Coolio
          </Button>
        </FlexItem>
        <FlexItem grow={false}>
          <Button variant="outline" {...actions}>
            Coolio
          </Button>
        </FlexItem>
      </FlexGroup>
    </ThemeWrapper>
  ))
