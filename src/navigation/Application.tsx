import type { RootNavigationParamList } from './navigators.types'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFlipper } from '@react-navigation/devtools'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'

import { navigationRef } from './root'

import { Box, EmergencyBottomSheet, screenOptions } from '@internal/components'
import {
  CredentialDetailScreen,
  CredentialOfferScreen,
  CredentialsScreen,
  InformationScreen,
} from '@internal/containers'
import { OnboardingContainer } from '@internal/containers/onboarding'
import { useSplashScreen } from '@internal/splashscreen/splashscreen'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AppSelectors, AppThunks } from '@internal/store/app'
import { useTheme } from '@internal/theme'

const Stack = createStackNavigator<RootNavigationParamList>()

export const ApplicationNavigator: React.FunctionComponent = () => {
  useSplashScreen()
  const theme = useTheme()
  const { colors, darkMode } = theme
  const { t } = useTranslation()
  // const isAppInitialized = useAppSelector(AppSelectors.isInitializedSelector)
  const isFirstLaunch = useAppSelector(AppSelectors.isFirstLaunchSelector)
  console.log(isFirstLaunch)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isFirstLaunch) {
      void dispatch(AppThunks.initialize())
    }
  }, [dispatch, isFirstLaunch])

  // Flipper debugging
  useFlipper(navigationRef)

  return (
    <Box fill>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} translucent />
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
                  name="InformationScreen"
                  component={InformationScreen}
                  options={{ title: t('feature.information.titles.main') }}
                />
              </>
            )}
          </Stack.Navigator>
          {/* TODO: call emergency via function and this would be a provider */}
          <EmergencyBottomSheet title="BRAND" subtitle="Jaarbeursplein, Utrecht" />
        </BottomSheetModalProvider>
      </NavigationContainer>
    </Box>
  )
}
