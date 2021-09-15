import type { BadgeSizes } from '@components/global-constants'
import type { AppTheme } from '@components/theme/themes'
import type { ViewStyle } from 'react-native'

import React from 'react'
import { StyleSheet, View } from 'react-native'

import { badgeSize } from '@components/global-constants'
import { useAppTheme } from '@components/theme/context'

export interface BadgeProps {
  badgeSize?: BadgeSizes
  display?: boolean | number
  badgeColor?: 'success' | 'danger' | 'warning'
  badgeStyle?: ViewStyle | ViewStyle[]
}

interface StylesProps {
  badgeColor: 'success' | 'danger' | 'warning'
  size: BadgeSizes
  colors: AppTheme['colors']
}

export const Badge: React.FunctionComponent<BadgeProps> = ({
  display = false,
  badgeSize: size = 'm',
  badgeColor = 'danger',
  badgeStyle,
  children,
}) => {
  const { colors } = useAppTheme()

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
      backgroundColor: colors[badgeColor][500],
      width: badgeSize[size],
      height: badgeSize[size],
      borderRadius: badgeSize[size] / 2,
      borderColor: colors.white[500],
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 100,
    },
  })
