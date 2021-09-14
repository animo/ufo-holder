import type { Theme } from '@internal/theme'
import type { HeaderOptions } from '@react-navigation/elements'

import React from 'react'
import { Platform, View } from 'react-native'

import { Heading } from '@components/lib'

const headingSize = Platform.OS === 'android' ? 'l' : 'm'

export const screenOptions = ({ colors }: Theme): HeaderOptions => {
  return {
    headerStyle: { backgroundColor: colors.background, shadowColor: colors.background },
    headerTitle: (props) => (
      <View>
        <Heading size={headingSize}>{props.children}</Heading>
      </View>
    ),
  }
}
