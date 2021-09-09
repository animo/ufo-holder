import type { FlexGrowKey, FlexGrowVal } from './FlexItem.styles'
import type { FunctionComponent } from 'react'
import type { FlexAlignType, ViewStyle, StyleSheet } from 'react-native'

import React, { memo } from 'react'
import { View } from 'react-native'

import { styles } from './FlexItem.styles'

interface Props {
  grow?: FlexGrowVal | false
  style?: ViewStyle | ViewStyle[]
  alignSelf?: FlexAlignType | 'auto'
  alignItems?: FlexAlignType
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  flex?: number
}

export const FlexItem: FunctionComponent<Props> = memo(
  ({ children, grow = 1, style, alignSelf, alignItems, justifyContent, flex }) => {
    const growStyle =
      grow === false
        ? styles.grow.none
        : (styles.grow[`grow${grow}` as unknown as FlexGrowKey] as unknown as StyleSheet.NamedStyles<unknown>)

    return (
      <View
        style={[
          styles.base,
          growStyle,
          {
            justifyContent,
            alignSelf,
            flex,
            alignItems,
          },
          style || {},
        ]}
      >
        {children}
      </View>
    )
  }
)
