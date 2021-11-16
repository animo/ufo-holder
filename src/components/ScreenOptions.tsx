import type { AppTheme } from '@components/theme/themes'
import type { HeaderOptions } from '@react-navigation/elements'

import React from 'react'

import { Box, Heading } from '@components/lib'
import { requestPlatform } from '@internal/utils'

const headingSize = requestPlatform() === 'android' ? 'xl' : 'l'

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
