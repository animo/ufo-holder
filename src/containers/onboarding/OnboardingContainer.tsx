import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'

import { Button } from '@components/lib'
import { useAppNavigation } from '@internal/navigation'

export const OnboardingContainer = () => {
  const ref = useRef<PagerView>(null)
  const navigation = useAppNavigation()

  return (
    <PagerView style={StyleSheet.absoluteFill} initialPage={0} ref={ref} scrollEnabled={false}>
      <Button onPress={() => navigation.navigate('CredentialsScreen')}>Go!</Button>
    </PagerView>
  )
}
