import type { ColorNames } from '../../theme'
import type { FunctionComponent } from 'react'
import type { FontWeight } from 'react-native-svg'

import { Text as __Text } from 'native-base'
import React from 'react'

import { useTheme } from '../../theme'

import { fontSize } from '@components/global-constants'

export type FontSize = 'xs' | 's' | 'm' | 'l'

export interface TextProps {
  weight?: FontWeight
  size?: FontSize
  color?: ColorNames
  align?: 'left' | 'right' | 'center' | 'justify'
}

export const Text: FunctionComponent<TextProps> = ({ color = 'text', weight, size = 'm', align, children }) => {
  const { colors } = useTheme()
  const mappedColor = colors[color]
  const mappedSize = fontSize[size]
  return (
    <__Text fontWeight={weight} fontSize={mappedSize} textAlign={align} color={mappedColor}>
      {children}
    </__Text>
  )
}
