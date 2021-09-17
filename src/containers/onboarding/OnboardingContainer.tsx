import type { ThemedStylesFunction } from '@components/theme'
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
import { useStyles } from '@components/theme'
import { useAppDispatch } from '@internal/store'
import { AppThunks } from '@internal/store/app'

export const OnboardingContainer = () => {
  const SLIDELENGTH = 5

  const [index, setIndex] = useState(0)
  const themedStyles = useStyles(Styles)
  const pagerViewRef = useRef<PagerView>(null)
  const dispatch = useAppDispatch()

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const currentIndex = event.nativeEvent.position
    setIndex(currentIndex)

    // LocationScreen OR LegalScreen
    if (currentIndex === 3 || currentIndex === 4) {
      pagerViewRef.current?.setScrollEnabled(false)
    }
  }

  /**
   * @todo ask for permissions
   */
  const onSetPermissions = () => {
    Alert.alert('PERMISSIONS', undefined, [{ text: 'Accepteren', onPress: () => pagerViewRef.current?.setPage(4) }])
  }

  const onUnderstandLegal = () => {
    void dispatch(AppThunks.newUser())
  }

  const indicators = []

  for (let i = 0; i < SLIDELENGTH; i++) {
    if (i === index) {
      indicators.push(<Box style={[themedStyles.dot, themedStyles.indexedDot]} key={i} />)
    } else {
      indicators.push(<Box style={themedStyles.dot} key={i} />)
    }
  }

  return (
    <>
      <PagerView style={StyleSheet.absoluteFill} initialPage={0} ref={pagerViewRef} onPageSelected={onPageSelected}>
        <PilotScreen />
        <WelcomeScreen />
        <CredentialsScreen />
        <LocationScreen onPress={onSetPermissions} />
        <LegalScreen onPress={onUnderstandLegal} />
      </PagerView>
      <FlexItem style={themedStyles.container}>{indicators}</FlexItem>
    </>
  )
}

const Styles: ThemedStylesFunction = ({ colors }) => {
  return {
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
      backgroundColor: colors.textSubdued[500],
      margin: 5,
    },
    indexedDot: {
      backgroundColor: colors.background[500],
    },
  }
}
