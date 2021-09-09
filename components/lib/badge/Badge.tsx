import type { BadgeSizes } from '@components/global-constants'
import type { Theme } from '@components/theme'
import type { ViewStyle } from 'react-native'

import React from 'react'
import { StyleSheet, View } from 'react-native'

import { badgeSize } from '@components/global-constants'
import { useTheme } from '@components/theme'

export interface BadgeProps {
  badgeSize?: BadgeSizes
  display?: boolean | number
  badgeColor?: 'success' | 'danger' | 'warning'
  badgeStyle?: ViewStyle | ViewStyle[]
}

interface StylesProps {
  badgeColor: 'success' | 'danger' | 'warning'
  size: BadgeSizes
  colors: Theme['colors']
}

export const Badge: React.FunctionComponent<BadgeProps> = ({
  display = false,
  badgeSize: size = 's',
  badgeColor = 'danger',
  badgeStyle,
  children,
}) => {
  const { colors } = useTheme()

  return (
    <View>
      {display ? <View style={[styles({ badgeColor, size, colors }).badge, badgeStyle]} /> : null}
      {children}
    </View>
  )
}

const styles = ({ badgeColor, size, colors }: StylesProps) =>
  StyleSheet.create({
    badge: {
      backgroundColor: colors[badgeColor],
      width: badgeSize[size],
      height: badgeSize[size],
      borderRadius: badgeSize[size] / 2,
      borderColor: colors.white,
      position: 'absolute',
      right: -3,
      top: 0,
      zIndex: 2,
    },
  })
