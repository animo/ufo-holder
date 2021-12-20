import { Avatar as _Avatar, Text } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Icon } from '../icon'

import { getInitials } from './util'

import { useAppTheme } from '@components/theme'
import { Box } from '@internal/components'
import { stringToHslColor } from '@internal/utils'

export interface AvatarProps {
  text?: string
  size?: number
  checked?: boolean
}

export const Avatar: React.FunctionComponent<AvatarProps> = ({ text, size = 12, checked = false }) => {
  const initials = text ? getInitials(text) : ''
  const { colors } = useAppTheme()

  return (
    <>
      <_Avatar size={size} bg={stringToHslColor(text ?? '')} fontSize={size}>
        <Text color={'#FFFFFF'} fontSize={size} fontWeight="bold">
          {initials}
        </Text>
      </_Avatar>
      {checked && (
        <Box style={[styles.container, { backgroundColor: colors.success[500] }]} center>
          <Icon type="checkmark-outline" size="s" color="white" />
        </Box>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0099ff',
    borderRadius: 100,
    height: 27,
    width: 27,
    position: 'relative',
    bottom: 20,
    left: 25,
  },
})
