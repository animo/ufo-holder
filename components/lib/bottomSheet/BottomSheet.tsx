import type { ThemedStylesFunction } from '@components/theme'
import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet'

import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { borderRadius, paddingSize } from '@components/global-constants'
import { layout } from '@components/global-stylesheets'
import { useStyles, useTheme } from '@components/theme'
import { Box, FlexItem } from '@internal/components'

export interface BottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>
  onChange?: () => void
  emergency?: boolean
}

export const BottomSheet: React.FunctionComponent<BottomSheetProps> = ({
  bottomSheetModalRef,
  emergency,
  children,
}) => {
  const styles = useStyles(Styles)
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const snapPoints = emergency ? ['90%'] : ['25%', '75%']

  const renderBackdrop = useCallback(
    ({ style, ...rest }: React.PropsWithChildren<BottomSheetBackgroundProps>) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={[style, { backgroundColor: colors.danger }]}
        {...rest}
      />
    ),
    [colors.danger]
  )

  return (
    <BottomSheetModal
      enablePanDownToClose={!emergency}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={emergency ? renderBackdrop : (props) => <BottomSheetBackdrop {...props} />}
      backgroundComponent={(props) => <Background {...props} />}
      handleComponent={() => (
        <FlexItem alignSelf="center">
          <View style={styles.closeLine} />
        </FlexItem>
      )}
    >
      <BottomSheetView style={layout.fill}>
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
