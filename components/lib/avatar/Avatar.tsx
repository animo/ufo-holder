import { Avatar as _Avatar } from 'native-base'
import React from 'react'

import { getInitials } from './util'

import { stringToHslColor } from '@internal/utils'

export interface AvatarProps {
  text?: string
  size?: number
}

export const Avatar: React.FunctionComponent<AvatarProps> = ({ text, size = 12 }) => {
  const initials = text ? getInitials(text) : ''

  return (
    <_Avatar size={size} bg={stringToHslColor(text ?? '')}>
      {initials}
    </_Avatar>
  )
}
