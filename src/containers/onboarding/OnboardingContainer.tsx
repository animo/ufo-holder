import type { PagerViewOnPageSelectedEvent } from 'react-native-pager-view'

import React, { useRef, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'

import { CredentialsScreen } from './screens/CredentialsScreen'
import { LegalScreen } from './screens/LegalScreen'
import { LocationScreen } from './screens/LocationScreen'
import { PilotScreen } from './screens/PilotScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'

import { Box, FlexItem } from '@components/lib'

export const OnboardingContainer = () => {
  const SLIDELENGTH = 4
  const [index, setIndex] = useState(0)

  const pagerViewRef = useRef<PagerView>(null)

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const currentIndex = event.nativeEvent.position
    setIndex(currentIndex)

    // LocationScreen OR LegalScreen
    if (currentIndex === 3 || currentIndex === 4) {
      pagerViewRef.current?.setScrollEnabled(false)
    }
  }

  const onSetPermissions = () => {
    Alert.alert('PERMISSIONS')
    pagerViewRef.current?.setPage(4)
  }

  const indicators = []

  for (let i = 0; i < SLIDELENGTH; i++) {
    if (i === index) {
      indicators.push(<Box style={[styles.dot, styles.indexedDot]} key={i} />)
    } else {
      indicators.push(<Box style={styles.dot} key={i} />)
    }
  }

  return (
    <>
      <PagerView style={StyleSheet.absoluteFill} initialPage={0} ref={pagerViewRef} onPageSelected={onPageSelected}>
        <PilotScreen />
        <WelcomeScreen />
        <CredentialsScreen />
        <LocationScreen onPress={onSetPermissions} />
        <LegalScreen />
      </PagerView>
      <FlexItem style={styles.container}>{indicators}</FlexItem>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    margin: 5,
  },
  indexedDot: {
    backgroundColor: 'black',
  },
})
