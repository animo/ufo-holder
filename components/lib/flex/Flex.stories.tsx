import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

import { ThemeWrapper, DefaultDecorator } from '../../storybook-utils'

import { FlexGroup } from './FlexGroup'
import { FlexItem } from './FlexItem'

const styles = StyleSheet.create({
  lavender: {
    backgroundColor: 'lavender',
  },
  thistle: {
    backgroundColor: 'thistle',
  },
  plum: {
    backgroundColor: 'plum',
  },
})

storiesOf('Flex', module)
  .addDecorator((story) => <DefaultDecorator>{story()}</DefaultDecorator>)
  .add('row', () => (
    <ThemeWrapper>
      <FlexGroup direction="row">
        <FlexItem style={styles.lavender} />
        <FlexItem style={styles.thistle} />
        <FlexItem style={styles.plum} />
      </FlexGroup>
    </ThemeWrapper>
  ))
  .add('column', () => (
    <ThemeWrapper>
      <FlexGroup direction="column">
        <FlexItem style={styles.lavender} />
        <FlexItem style={styles.thistle} />
        <FlexItem style={styles.plum} />
      </FlexGroup>
    </ThemeWrapper>
  ))
  .add('different grow sizes', () => (
    <ThemeWrapper>
      <FlexGroup direction="row">
        <FlexItem grow={1} style={styles.lavender} />
        {/* invisible! */}
        <FlexItem grow={false} style={styles.thistle} />
        <FlexItem grow={3} style={styles.plum} />
      </FlexGroup>
    </ThemeWrapper>
  ))
