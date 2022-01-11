import type { ThemedStylesFunction } from '@components/theme'
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import type { MapViewDirectionsMode } from 'react-native-maps-directions'
import type { PagerViewOnPageSelectedEvent } from 'react-native-pager-view'

import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'

import { AppScreen } from './screens/AppScreen'
import { CredentialsScreen } from './screens/CredentialsScreen'
import { LegalScreen } from './screens/LegalScreen'
import { LocationScreen } from './screens/LocationScreen'
import { PilotScreen } from './screens/PilotScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { TravelModeScreen } from './screens/TravelModeScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'

import { Box, FlexItem } from '@components/lib'
import { useStyles } from '@components/theme'
import { openSettings, requestPermission } from '@internal/modules'
import { useAppDispatch } from '@internal/store'
import { AppThunks } from '@internal/store/app'
import { AppActions } from '@internal/store/app/app.reducer'
import { AriesThunks } from '@internal/store/aries'

export const OnboardingContainer = () => {
  const pages = ['app', 'pilot', 'register', 'welcome', 'credentials', 'travelMode', 'location', 'legal'] as const
  type Page = typeof pages[number]

  const SLIDELENGTH = pages.length

  const [pageIndex, setPageIndex] = useState(0)
  const [name, setName] = useState('')
  const [travelMode, setTravelMode] = useState<MapViewDirectionsMode>('WALKING')
  const themedStyles = useStyles(Styles)
  const pagerViewRef = useRef<PagerView>(null)
  const dispatch = useAppDispatch()

  const goToPage = (page: Page | 'next') => {
    let index = pageIndex + 1
    if (page !== 'next') {
      index = pages.indexOf(page)
    }

    pagerViewRef.current?.setPage(index)

    setPageIndex(index)
  }

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const currentIndex = event.nativeEvent.position
    setPageIndex(currentIndex)
    const page = pages[currentIndex]

    if (page === 'register' || page === 'location' || page === 'legal') {
      pagerViewRef.current?.setScrollEnabled(false)
    } else {
      pagerViewRef.current?.setScrollEnabled(true)
    }
  }

  const onRegister = () => {
    void dispatch(AriesThunks.updateAgentName({ name }))
    goToPage('next')
  }

  const onRegisterInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    // when registering a new user this name has to be used as the label
    setName(e.nativeEvent.text)
  }

  const onSetLocation = async () => {
    const hasLocationPermissions = await requestPermission('location')
    if (hasLocationPermissions === 'granted') {
      goToPage('next')
    } else {
      // TODO: page should show a different view where you press on
      // `openSettings` yourself
      void openSettings()
    }
  }

  const onSelectTravelMode = () => {
    void dispatch(AppActions.setTravelMode({ travelMode }))
    goToPage('next')
  }

  const onUnderstandLegal = () => dispatch(AppThunks.newUser())

  const indicators = []

  for (let i = 0; i < SLIDELENGTH; i++) {
    if (i === pageIndex) {
      indicators.push(<Box style={[themedStyles.dot, themedStyles.indexedDot]} key={i} />)
    } else {
      indicators.push(<Box style={themedStyles.dot} key={i} />)
    }
  }

  return (
    <>
      <PagerView style={StyleSheet.absoluteFill} initialPage={0} ref={pagerViewRef} onPageSelected={onPageSelected}>
        <AppScreen />
        <PilotScreen />
        <RegisterScreen onPress={onRegister} onChange={onRegisterInputChange} />
        <WelcomeScreen />
        <CredentialsScreen />
        <TravelModeScreen onSelect={setTravelMode} selected={travelMode} onPress={onSelectTravelMode} />
        <LocationScreen onPress={onSetLocation} />
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
      backgroundColor: colors.background[600],
    },
  }
}
