import type { BadgeProps } from '../badge/Badge'
import type { IconProps, IconSizes } from './Icon'

import React from 'react'

import { Badge } from '../badge/Badge'

import { Icon } from './Icon'

export type BadgedIconProps = BadgeProps & IconProps & { size: IconSizes }

export const BadgedIcon: React.FunctionComponent<BadgedIconProps> = ({
  badgeColor,
  display,
  iconType,
  iconColor,
  size,
}) => (
  <Badge display={display} badgeColor={badgeColor} badgeSize="s">
    <Icon iconType={iconType} iconColor={iconColor} iconSize={size} />
  </Badge>
)
