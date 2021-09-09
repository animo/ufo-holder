import type { FontSizes } from '../../global-constants'
import type { ColorNames } from '@components/theme'

import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'

import { fontSize } from '../../global-constants'

import { useTheme } from '@components/theme'

export type IconSizes = keyof FontSizes

export interface IconProps {
  iconType: string
  iconSize?: IconSizes | number
  iconColor?: ColorNames
}

export const Icon: React.FunctionComponent<IconProps> = ({ iconType, iconSize = 'm', iconColor = 'text' }) => {
  const { colors } = useTheme()

  const color = colors[iconColor]
  const size = typeof iconSize === 'number' ? iconSize : fontSize[iconSize]

  return <IonIcon name={iconType} size={size} color={color} />
}
