import type { Theme } from '@internal/theme'
import type { HeaderOptions } from '@react-navigation/elements'

import React from 'react'
import { Platform } from 'react-native'

import { Box, Heading } from '@components/lib'

const headingSize = Platform.OS === 'android' ? 'xl' : 'l'

// TODO: Icon cutoff
export const screenOptions = ({ colors }: Theme): HeaderOptions => {
  return {
    headerStyle: { backgroundColor: colors.background, shadowColor: colors.background },
    headerTitle: (props) => (
      <Box>
        <Heading size={headingSize}>{props.children}</Heading>
      </Box>
    ),
  }
}
