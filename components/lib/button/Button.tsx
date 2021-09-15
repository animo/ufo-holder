import type { ColorNames } from '@components/theme/themes'
import type { IButtonProps } from 'native-base'

import { Button as _Button } from 'native-base'
import React from 'react'

import { useAppTheme } from '@components/theme/context'
import { Text } from '@internal/components'

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
  const { colors } = useAppTheme()
  return (
    <_Button bg={colors[color][500]} onPress={onPress} variant={variant} disabled={disabled}>
      <Text color="white">{children}</Text>
    </_Button>
  )
}
