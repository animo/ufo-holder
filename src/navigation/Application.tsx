import type { RootNavigationParamList } from './navigators.types'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFlipper } from '@react-navigation/devtools'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'

import { navigationRef } from './root'

import { Box, screenOptions } from '@internal/components'
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
  const isAppInitialized = useAppSelector(AppSelectors.isInitializedSelector)
  const isAgentInitialized = false

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(AppThunks.initialize())
  }, [dispatch])

  // Flipper debugging
  useFlipper(navigationRef)

  return (
    <Box fill style={{ backgroundColor: colors.background }}>
      <NavigationContainer
        theme={{
          colors: {
            background: colors.background,
            border: colors.borderSubdued,
            card: colors.bottomBarBackground,
            notification: colors.background,
            text: colors.text,
            primary: colors.text,
          },
          dark: darkMode,
        }}
        ref={navigationRef}
      >
        <StatusBar
          barStyle={darkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.transparent}
          translucent
        />
        {isAppInitialized && (
          <BottomSheetModalProvider>
            <Stack.Navigator screenOptions={screenOptions(theme)}>
              {isAgentInitialized ? (
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
              ) : (
                <Stack.Screen name="OnboardingStack" component={OnboardingContainer} options={{ headerShown: false }} />
              )}
            </Stack.Navigator>
          </BottomSheetModalProvider>
        )}
      </NavigationContainer>
    </Box>
  )
}
