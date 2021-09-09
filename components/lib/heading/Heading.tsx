import type { ColorNames } from '@components/theme'
import type { FunctionComponent } from 'react'
import type { TextProps } from 'react-native'

import React from 'react'

import { fontSizes } from '../../global-stylesheets'
import { Text } from '../text/Text'

type FontSize = 's' | 'm' | 'l' | 'xl'

interface Props extends TextProps {
  size?: FontSize
  color?: ColorNames
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify'
}

export const Heading: FunctionComponent<Props> = ({ size = 'l', color = 'text', align, style, children }) => {
  return (
    <Text style={[fontSizes.heading[size], style]} color={color} align={align}>
      {children}
    </Text>
  )
}
