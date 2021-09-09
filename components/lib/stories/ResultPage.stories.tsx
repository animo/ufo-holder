import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

import { ThemeWrapper } from '../../storybook-utils'
import { Box } from '../box'
import { Icon } from '../icon'

storiesOf('ResultPage', module)
  .add('success', () => (
    <ThemeWrapper>
      <Box fill center>
        <Icon iconType="checkmark-circle" iconColor="success" iconSize={120} />
      </Box>
    </ThemeWrapper>
  ))
  .add('error', () => (
    <ThemeWrapper>
      <Box fill center>
        <Icon iconType="close-circle" iconColor="danger" iconSize={120} />
      </Box>
    </ThemeWrapper>
  ))
  .add('loading', () => (
    <ThemeWrapper>
      <Box fill center>
        <ActivityIndicator size="large" />
      </Box>
    </ThemeWrapper>
  ))
