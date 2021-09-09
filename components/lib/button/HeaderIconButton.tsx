import type { IconButtonProps } from './IconButton'

import React from 'react'

import { gutters } from '@components/global-stylesheets'
import { IconButton } from '@internal/components'

export const HeaderIconButton: React.FunctionComponent<IconButtonProps> = ({ onPress, iconType }) => (
  <IconButton onPress={onPress} iconType={iconType} iconSize="xl" style={gutters.largeRPadding} />
)
