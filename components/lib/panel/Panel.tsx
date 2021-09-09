import type { PaddingSizes } from '../../global-stylesheets'
import type { Theme } from '../../theme'
import type { ViewStyle } from 'react-native'

import React from 'react'
import { StyleSheet } from 'react-native'

import { borderRadiusSizes } from '../../global-stylesheets'
import { useStyles, useTheme } from '../../theme'

import { Box } from '@internal/components'

type PanelColor = 'warning' | 'danger' | 'success' | 'primary' | 'transparent' | 'card'

export interface PanelProps {
  paddingSize?: PaddingSizes
  borderRadius?: 's' | 'none'
  color?: PanelColor
  style?: ViewStyle | ViewStyle[]
}

export const Panel: React.FunctionComponent<PanelProps> = ({
  children,
  paddingSize = 'l',
  borderRadius = 's',
  color = 'card',
  style,
}) => {
  const styles = useStyles(PanelStyles)
  const { colors } = useTheme()

  return (
    <Box
      paddingSize={paddingSize}
      style={[
        StyleSheet.flatten(style),
        { backgroundColor: colors[color] },
        borderRadiusSizes[borderRadius],
        styles.panel,
      ]}
    >
      {children}
    </Box>
  )
}

// from: https://ethercreative.github.io/react-native-shadow-generator/
const PanelStyles = ({ colors }: Theme) => {
  return {
    panel: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
  }
}
