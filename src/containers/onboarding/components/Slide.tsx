import React from 'react'
import { StyleSheet, View } from 'react-native'

import { FlexGroup, Button, Page } from '@components/lib'

export interface SlideProps {
  onPressNextSlide: () => void
  buttonMessage: string
  buttonDisabled?: boolean
}

export const Slide: React.FunctionComponent<SlideProps> = ({
  children,
  onPressNextSlide,
  buttonMessage,
  buttonDisabled = false,
}) => (
  <View style={StyleSheet.absoluteFill} collapsable={false}>
    <Page safeArea>
      <FlexGroup>
        {children}
        <Button disabled={buttonDisabled} onPress={onPressNextSlide}>
          {buttonMessage}
        </Button>
      </FlexGroup>
    </Page>
  </View>
)
