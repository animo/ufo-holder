import type { ThemedStylesFunction } from '@components/theme'
import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet'
import type { LayoutChangeEvent } from 'react-native'

import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { borderRadius, paddingSize } from '@components/global-constants'
import { layout } from '@components/global-stylesheets'
import { useStyles } from '@components/theme'
import { Box, FlexItem } from '@internal/components'
import { useTheme } from '@internal/theme'

export interface BottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>
  onChange?: () => void
  fullScreen?: boolean
}

export const BottomSheet: React.FunctionComponent<BottomSheetProps> = ({
  bottomSheetModalRef,
  children,
  fullScreen,
}) => {
  const [contentHeight, setContentHeight] = useState(0)
  const insets = useSafeAreaInsets()

  let snapPoints: (string | number)[] = useMemo(() => [1, contentHeight], [contentHeight])
  if (fullScreen) {
    snapPoints = ['100%']
  }

  const styles = useStyles(Styles)

  const handleOnLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    const { height } = nativeEvent.layout
    setContentHeight(height)
  }, [])

  const handleOnChange = (i: number) => {
    if (i === 0) {
      bottomSheetModalRef.current?.close()
    }
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={fullScreen ? 0 : 1}
      onChange={fullScreen ? undefined : handleOnChange}
      backdropComponent={fullScreen ? undefined : (props) => <BottomSheetBackdrop {...props} />}
      backgroundComponent={(props) => <Background {...props} />}
      handleComponent={() => (
        <FlexItem alignSelf="center">
          <View style={styles.closeLine} />
        </FlexItem>
      )}
    >
      <BottomSheetView style={layout.fill} onLayout={handleOnLayout}>
        <Box paddingSize="l" style={[layout.fill, { paddingBottom: Math.max(insets.bottom, paddingSize.l) }]}>
          {children}
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export const Background: React.FC<BottomSheetBackgroundProps> = ({ style }) => {
  const { colors } = useTheme()
  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          borderRadius: borderRadius.l,
        },
        style,
      ]}
    />
  )
}

export const Styles: ThemedStylesFunction = ({ colors }) => ({
  closeLine: {
    width: 35,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.text,
    marginTop: 9,
  },
})
