import type { ColorNames } from '../../theme'
import type { FunctionComponent } from 'react'
import type { TextProps } from 'react-native'

import React from 'react'
import { Text as _Text } from 'react-native'

import { fontSizes } from '../../global-stylesheets'
import { useTheme } from '../../theme'

export type FontSize = 'xs' | 's' | 'm' | 'l'

interface Props extends TextProps {
  size?: FontSize
  color?: ColorNames
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  weight?: 'normal' | 'bold'
}

export const Text: FunctionComponent<Props> = ({
  size = 'm',
  color = 'text',
  weight = 'normal',
  children,
  align,
  style,
  ...rest
}) => {
  const { colors } = useTheme()
  return (
    <_Text
      style={[fontSizes.text[size], { textAlign: align, color: colors[color], fontWeight: weight }, style]}
      {...rest}
    >
      {children}
    </_Text>
  )
}
