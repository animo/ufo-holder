import type { IconButtonProps } from './IconButton'

import React from 'react'

import { gutters } from '@components/global-stylesheets'
import { IconButton } from '@internal/components'

export const HeaderIconButton: React.FunctionComponent<IconButtonProps> = ({ onPress, type, color }) => (
  <IconButton onPress={onPress} type={type} size="m" style={gutters.largeRPadding} color={color} />
)
