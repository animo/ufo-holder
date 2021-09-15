import type { AppTheme } from '@components/theme/themes'
import type { HeaderOptions } from '@react-navigation/elements'

import React from 'react'
import { Platform } from 'react-native'

import { Box, Heading } from '@components/lib'

const headingSize = Platform.OS === 'android' ? 'xl' : 'l'

export const screenOptions = ({ colors }: AppTheme): HeaderOptions => {
  return {
    headerStyle: { backgroundColor: colors.background[500], shadowColor: colors.background[500] },
    headerTitle: (props) => (
      <Box>
        <Heading size={headingSize}>{props.children}</Heading>
      </Box>
    ),
  }
}
