import type { ColorNames } from '@components/theme'
import type { IButtonProps } from 'native-base'

import { Button as _Button } from 'native-base'
import React from 'react'

import { useTheme } from '@components/theme'

export interface ButtonProps extends Pick<IButtonProps, 'variant'> {
  color?: ColorNames
  disabled?: boolean
  onPress: () => void
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  color = 'primary',
  onPress,
  variant,
  disabled,
  children,
}) => {
  const { colors } = useTheme()
  const mappedColor = colors[color]
  return (
    <_Button bg={mappedColor} onPress={onPress} variant={variant} disabled={disabled}>
      {children}
    </_Button>
  )
}
