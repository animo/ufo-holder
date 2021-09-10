import type { FlexGroupAlignItems, FlexGroupJustifyContent, FlexGroupDirection } from './FlexGroup.styles'
import type { FunctionComponent, PropsWithChildren } from 'react'
import type { ViewStyle } from 'react-native'

import React, { memo } from 'react'
import { View } from 'react-native'

import { styles } from './FlexGroup.styles'

interface Props {
  flex?: number | false
  direction?: FlexGroupDirection
  alignItems?: FlexGroupAlignItems
  justifyContent?: FlexGroupJustifyContent
  wrap?: boolean
  style?: ViewStyle | ViewStyle[]
}

const FlexGroupBase: FunctionComponent<Props> = ({
  children,
  flex,
  direction,
  alignItems,
  justifyContent,
  wrap = false,
  style,
}) => {
  return (
    <View
      style={[
        styles.base,
        flex === false && styles.flexReset,
        flex !== undefined && flex !== false && { flex },
        direction && styles.direction[direction],
        alignItems && styles.alignItems[alignItems],
        justifyContent && styles.justifyContent[justifyContent],
        wrap && styles.wrap,
        style || {},
      ]}
    >
      {children}
    </View>
  )
}

export const FlexGroup = memo<PropsWithChildren<Props>>(FlexGroupBase)
