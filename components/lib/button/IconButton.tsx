import type { IconProps } from '../icon/Icon'
import type { IIconButtonProps } from 'native-base'

import { IconButton as _IconButton } from 'native-base'
import React from 'react'

import { Icon } from '../icon/Icon'

export type IconButtonProps = IconProps & Omit<IIconButtonProps, 'icon' | 'size'>

export const IconButton: React.FunctionComponent<IconButtonProps> = ({ type, size, color, onPress }) => (
  <_IconButton icon={<Icon type={type} size={size} color={color} />} onPress={onPress} opacity={1} variant="unstyled" />
)
