import type { MarginSizes, PaddingSizes } from '@components/global-stylesheets'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'

import React from 'react'
import { View } from 'react-native'

import { layout, marginSizes, paddingSizes } from '@components/global-stylesheets'

export interface BoxProps {
  paddingSize?: PaddingSizes
  marginSize?: MarginSizes
  style?: ViewStyle | ViewStyle[]
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined
  fill?: boolean
  center?: boolean
}

export const Box: React.FunctionComponent<BoxProps> = ({
  paddingSize = 'none',
  marginSize = 'none',
  style,
  onLayout,
  fill,
  children,
  center,
}) => {
  const filled = fill ? layout.fill : {}
  const centered = center ? layout.center : {}
  return (
    <View style={[paddingSizes[paddingSize], marginSizes[marginSize], filled, centered, style]} onLayout={onLayout}>
      {children}
    </View>
  )
}
