import type { PaddingSizes } from '@components/global-stylesheets'
import type { PropsWithChildren } from 'react'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'

import React from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { paddingSizes } from '@components/global-stylesheets'
import { Box } from '@internal/components'

export interface PageProps {
  paddingSize?: PaddingSizes
  onLayout?: (event: LayoutChangeEvent) => void
  style?: ViewStyle | ViewStyle[]
  center?: boolean
  safeArea?: boolean
  scrollable?: boolean
}

export const Page: React.FunctionComponent<PropsWithChildren<PageProps>> = ({
  paddingSize = 'xl',
  onLayout,
  style,
  center = false,
  safeArea = false,
  scrollable = false,
  children,
}) => {
  const insets = useSafeAreaInsets()

  const objectStyle = StyleSheet.flatten(style)

  if (safeArea) {
    return (
      <Box
        paddingSize="none"
        onLayout={onLayout}
        center={center}
        scrollable={scrollable}
        fill
        style={[
          objectStyle,
          {
            paddingBottom: Math.max(insets.bottom, paddingSizes[paddingSize].padding),
            paddingTop: Math.max(insets.top, paddingSizes[paddingSize].padding),
            paddingLeft: Math.max(insets.left, paddingSizes[paddingSize].padding),
            paddingRight: Math.max(insets.right, paddingSizes[paddingSize].padding),
          },
        ]}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box paddingSize={paddingSize} onLayout={onLayout} fill style={style} scrollable={scrollable}>
      {children}
    </Box>
  )
}
