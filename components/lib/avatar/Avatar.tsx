import type { AvatarSizes } from '@components/global-constants'
import type { ImageStyle, TextStyle } from 'react-native'

import React from 'react'

import { UserAvatar } from './UserAvatar'

import { Box } from '@internal/components'
import { stringToHslColor } from '@internal/utils/color'

export interface AvatarProps {
  avatarName: string
  avatarSize?: AvatarSizes
  avatarStyle?: ImageStyle | ImageStyle[] | TextStyle | TextStyle[]
  id: string
}

export const Avatar: React.FunctionComponent<AvatarProps> = ({
  avatarSize: size = 'm',
  avatarStyle,
  avatarName,
  id,
}) => (
  <Box style={avatarStyle}>
    <UserAvatar textColor="white" name={avatarName} size={size} backgroundColor={stringToHslColor(id)} />
  </Box>
)
