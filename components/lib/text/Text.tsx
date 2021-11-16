import type { ColorNames } from '@components/theme/themes'
import type { FunctionComponent } from 'react'
import type { FontWeight } from 'react-native-svg'

import { Text as __Text } from 'native-base'
import React from 'react'

import { useAppTheme } from '../../theme'

import { fontSize } from '@components/global-constants'

export type FontSize = 'xs' | 's' | 'm' | 'l'

export interface TextProps {
  weight?: FontWeight
  size?: FontSize
  color?: ColorNames
  align?: 'left' | 'right' | 'center' | 'justify'
  underline?: boolean
}

export const Text: FunctionComponent<TextProps> = ({
  color = 'text',
  weight,
  size = 'm',
  align,
  underline = false,
  children,
}) => {
  const { colors } = useAppTheme()
  const mappedSize = fontSize[size]

  return (
    <__Text
      fontWeight={weight}
      fontSize={mappedSize}
      textAlign={align}
      color={colors[color][500]}
      underline={underline}
    >
      {children}
    </__Text>
  )
}
