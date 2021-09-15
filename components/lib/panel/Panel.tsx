import type { PaddingSizes } from '../../global-stylesheets'
import type { ColorNames, AppTheme } from '@components/theme/themes'
import type { ViewStyle } from 'react-native'

import React from 'react'
import { StyleSheet } from 'react-native'

import { borderRadiusSizes } from '../../global-stylesheets'
import { useAppTheme, useStyles } from '../../theme'

import { Box } from '@internal/components'

export interface PanelProps {
  paddingSize?: PaddingSizes
  borderRadius?: 's' | 'none'
  color?: ColorNames
  style?: ViewStyle | ViewStyle[]
}

export const Panel: React.FunctionComponent<PanelProps> = ({
  children,
  paddingSize = 'l',
  borderRadius = 's',
  color = 'background',
  style,
}) => {
  const styles = useStyles(PanelStyles)
  const { colors } = useAppTheme()

  return (
    <Box
      paddingSize={paddingSize}
      style={[
        StyleSheet.flatten(style),
        { backgroundColor: colors[color][500] },
        borderRadiusSizes[borderRadius],
        styles.panel,
      ]}
    >
      {children}
    </Box>
  )
}

// from: https://ethercreative.github.io/react-native-shadow-generator/
const PanelStyles = ({ colors }: AppTheme) => {
  return {
    panel: {
      shadowColor: colors.black[500],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
  }
}
