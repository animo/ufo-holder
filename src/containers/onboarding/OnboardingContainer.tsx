import type { ConnectionRecord } from '@aries-framework/core'
import type { ThemedStylesFunction } from '@components/theme'
import type { RegisteredDevice, RegisteredDeviceDenied } from '@internal/utils'
import type { PagerViewOnPageSelectedEvent } from 'react-native-pager-view'

import React, { useRef, useState } from 'react'
import { Alert, Platform, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'

import { CredentialsScreen } from './screens/CredentialsScreen'
import { LegalScreen } from './screens/LegalScreen'
import { LocationScreen } from './screens/LocationScreen'
import { NotificationScreen } from './screens/NotificationsScreen'
import { PilotScreen } from './screens/PilotScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'

import { Box, FlexItem } from '@components/lib'
import { useStyles } from '@components/theme'
import { useAppDispatch } from '@internal/store'
import { AppThunks } from '@internal/store/app'
import { Notifications } from '@internal/utils'

export const OnboardingContainer = () => {
  const SLIDELENGTH = 6

  const [index, setIndex] = useState(0)
  const themedStyles = useStyles(Styles)
  const pagerViewRef = useRef<PagerView>(null)
  const dispatch = useAppDispatch()

  const onPageSelected = (event: PagerViewOnPageSelectedEvent) => {
    const currentIndex = event.nativeEvent.position
    setIndex(currentIndex)

    // LocationScreen OR NotificationScreen OR LegalScreen
    if (currentIndex === 3 || currentIndex === 4 || currentIndex === 5) {
      pagerViewRef.current?.setScrollEnabled(false)
    }
  }

  /**
   * @todo ask for permissions
   */
  const onSetLocation = () =>
    Alert.alert('PERMISSIONS', undefined, [{ text: 'Accepteren', onPress: () => pagerViewRef.current?.setPage(4) }])

  /**
   * @todo should use a callback (maybe?)
   */
  const onSetNotifications = () => {
    const platform = Platform.OS === 'android' || Platform.OS === 'ios' ? Platform.OS : null
    if (platform) {
      Notifications.registered((event: RegisteredDevice) => {
        Notifications.registerDeviceAtNotificationServer({ token: event.deviceToken, platform })
        new Notifications().handleEvents()
        pagerViewRef.current?.setPage(5)
      })
      Notifications.registeredError(() => {
        pagerViewRef.current?.setPage(5)
      })
      Notifications.register()
    } else {
      // could not detect the OS (should NEVER EVER happen)
      pagerViewRef.current?.setPage(5)
    }
  }

  const onUnderstandLegal = () => dispatch(AppThunks.newUser())

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
        <LocationScreen onPress={onSetLocation} />
        <NotificationScreen onPress={onSetNotifications} />
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
