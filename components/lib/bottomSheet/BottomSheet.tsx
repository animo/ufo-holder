import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet'

import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { borderRadius, paddingSize } from '@components/global-constants'
import { layout } from '@components/global-stylesheets'
import { useAppTheme } from '@components/theme'
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
  const insets = useSafeAreaInsets()
  const { colors } = useAppTheme()

  const snapPoints = emergency ? ['87%'] : ['15%', '87%']

  const renderBackdrop = useCallback(
    ({ style, ...rest }: React.PropsWithChildren<BottomSheetBackgroundProps>) => (
      <BottomSheetBackdrop
        pressBehavior="none"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.9}
        style={[style, { backgroundColor: colors.danger[500] }]}
        {...rest}
      />
    ),
    [colors.danger]
  )

  return (
    <BottomSheetModal
      enablePanDownToClose={false}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={emergency ? renderBackdrop : (props) => <BottomSheetBackdrop {...props} />}
      backgroundComponent={(props) => <Background {...props} />}
      handleComponent={Handle}
    >
      <BottomSheetView style={layout.fill}>
        <Box paddingSize="l" style={[layout.fill, { paddingBottom: Math.max(insets.bottom, paddingSize.l) }]}>
          {children}
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const Background: React.FC<BottomSheetBackgroundProps> = ({ style }) => {
  const { colors } = useAppTheme()
  return (
    <View
      style={[
        {
          backgroundColor: colors.background[500],
          borderRadius: borderRadius.l,
        },
        style,
      ]}
    />
  )
}

const Handle = () => {
  const { colors } = useAppTheme()
  return (
    <FlexItem alignSelf="center">
      <View style={[styles.closeLine, { backgroundColor: colors.black[500] }]} />
    </FlexItem>
  )
}

const styles = StyleSheet.create({
  closeLine: {
    width: 35,
    height: 5,
    borderRadius: 3,
    marginTop: 9,
  },
})
