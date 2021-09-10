import type { IconSizes } from '../../global-constants'
import type { ColorNames } from '@components/theme'
import type { IIconProps } from 'native-base'

import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'

import { iconSize } from '../../global-constants'

import { useTheme } from '@components/theme'

export interface IconProps extends Omit<IIconProps, 'color'> {
  type: string
  size?: IconSizes
  color?: ColorNames
}

export const Icon: React.FunctionComponent<IconProps> = ({ type, size = 'm', color = 'text' }) => {
  const { colors } = useTheme()

  const mappedSize = iconSize[size]
  const mappedColor = colors[color]

  return <IonIcon name={type} size={mappedSize} color={mappedColor} />
}
