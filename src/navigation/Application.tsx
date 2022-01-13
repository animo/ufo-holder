import type { RootNavigationParamList } from './navigators.types'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFlipper } from '@react-navigation/devtools'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'

import { navigationRef } from './root'

import { useAppTheme } from '@components/theme/context'
import { Box, EmergencyBottomSheet, screenOptions } from '@internal/components'
import {
  CredentialDetailScreen,
  CredentialOfferScreen,
  CredentialsScreen,
  FeedbackScreen,
  MapsScreen,
  OnboardingContainer,
} from '@internal/containers'
import { TravelModeScreen } from '@internal/containers/travelmode/screens/TravelModeScreen'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AppSelectors, AppThunks } from '@internal/store/app'
import { GeoThunks } from '@internal/store/geo'

const Stack = createStackNavigator<RootNavigationParamList>()

export const ApplicationNavigator: React.FunctionComponent = () => {
  const theme = useAppTheme()
  const { colors, darkMode } = theme
  const { t } = useTranslation()
  const isFirstLaunch = useAppSelector(AppSelectors.isFirstLaunchSelector)
  const dispatch = useAppDispatch()

  // Flipper debugging
  useFlipper(navigationRef)

  useEffect(() => {
    if (!isFirstLaunch) {
      void (async () => {
        await dispatch(AppThunks.initializeAgent())
        await dispatch(GeoThunks.setupTaskManagers())
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box fill>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          colors: {
            background: colors.background[500],
            border: colors.background[500],
            card: colors.background[500],
            notification: colors.background[500],
            primary: colors.primary[500],
            text: colors.text[500],
          },
          dark: darkMode,
        }}
      >
        <StatusBar
          barStyle={darkMode ? 'light-content' : 'dark-content'}
          translucent
          backgroundColor={colors.transparent[100]}
        />
        <BottomSheetModalProvider>
          <Stack.Navigator screenOptions={screenOptions(theme)}>
            {isFirstLaunch ? (
              <Stack.Screen name="OnboardingStack" component={OnboardingContainer} options={{ headerShown: false }} />
            ) : (
              <>
                <Stack.Screen
                  name="CredentialsScreen"
                  component={CredentialsScreen}
                  options={{ title: t('feature.credentials.titles.main') }}
                />

                <Stack.Screen
                  name="CredentialOfferScreen"
                  component={CredentialOfferScreen}
                  options={{ title: t('feature.credentials.titles.offer'), headerBackTitleVisible: false }}
                />
                <Stack.Screen
                  name="CredentialDetailScreen"
                  component={CredentialDetailScreen}
                  options={{ title: t('feature.credentials.titles.detail'), headerBackTitleVisible: false }}
                />

                <Stack.Screen
                  name="TravelModeScreen"
                  component={TravelModeScreen}
                  options={{ headerShown: false, gestureEnabled: false }}
                />

                <Stack.Screen
                  name="MapsScreen"
                  component={MapsScreen}
                  options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                  name="FeedbackScreen"
                  component={FeedbackScreen}
                  options={{ title: t('feature.feedback.title'), gestureEnabled: false, headerBackTitleVisible: false }}
                />
              </>
            )}
          </Stack.Navigator>
          <EmergencyBottomSheet />
        </BottomSheetModalProvider>
      </NavigationContainer>
    </Box>
  )
}
