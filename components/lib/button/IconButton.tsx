import type { IconProps } from '../icon/Icon'
import type { ButtonProps } from './Button'

import React from 'react'

import { Button, Icon } from '@internal/components'

export type IconButtonProps = ButtonProps & IconProps

export const IconButton: React.FunctionComponent<IconButtonProps> = ({
  onPress,
  variant = 'plain',
  disabled,
  iconType,
  iconSize,
  iconColor,
  style,
}) => (
  <Button onPress={onPress} variant={variant} disabled={disabled} style={style}>
    <Icon iconType={iconType} iconSize={iconSize} iconColor={iconColor} />
  </Button>
)
