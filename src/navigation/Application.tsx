import type { RootNavigationParamList } from './navigators.types'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFlipper } from '@react-navigation/devtools'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'

import { MainTabs } from './MainTabs'
import { navigationRef } from './root'

import { Box, screenOptions, Toast } from '@internal/components'
import {
  AddContactScreen,
  CredentialDetailScreen,
  CredentialModalScreen,
  EditContactScreen,
  InvitationQrScannerScreen,
  ProofModalScreen,
  ProofSelectionScreen,
} from '@internal/containers'
import { ProofEditScreen } from '@internal/containers/actions/screens/ProofEditScreen'
import { OnboardingContainer } from '@internal/containers/onboarding'
import { ProofDetailScreen } from '@internal/containers/proofs/screens/ProofDetailScreen'
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
  // TODO: fix with the pin merge
  const isAgentInitialized = true

  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(AppThunks.initialize())
  }, [dispatch])

  // Flipper debugging
  useFlipper(navigationRef)

  // Loading screen is initially rendered
  // Main is rendered when the user is signed in.
  // FirstLaunch is rendered when the user is not signed in
  // TODO: properly handle safe area view. Don't want to wrap whole app as that blocks camera view
  // from taking full screen
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
              {/*  TODO: handle first login */}
              {isAgentInitialized ? (
                <>
                  <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
                  {/* Actions */}
                  <Stack.Screen
                    name="CredentialOfferModal"
                    component={CredentialModalScreen}
                    options={{ title: t('feature.actions.title.credentialOffer'), headerBackTitleVisible: false }}
                  />
                  <Stack.Screen
                    name="ProofRequestModal"
                    component={ProofModalScreen}
                    options={{ headerBackTitleVisible: false }}
                  />
                  <Stack.Screen
                    name="ProofRequestEdit"
                    component={ProofEditScreen}
                    options={{ title: t('feature.actions.title.editProof'), headerBackTitleVisible: false }}
                  />
                  <Stack.Screen
                    name="ProofSelection"
                    component={ProofSelectionScreen}
                    options={{ title: t('feature.actions.title.selectProof') }}
                  />

                  {/* Credentials */}
                  <Stack.Screen
                    name="CredentialDetail"
                    component={CredentialDetailScreen}
                    options={{ title: t('feature.credentials.title.details'), headerBackTitleVisible: false }}
                  />

                  {/* Proof */}
                  <Stack.Screen
                    name="ProofDetail"
                    component={ProofDetailScreen}
                    options={{ headerBackTitleVisible: false }}
                  />

                  {/* Contacts */}
                  <Stack.Screen
                    name="InvitationQrScanner"
                    component={InvitationQrScannerScreen}
                    options={{ headerShown: false, presentation: 'modal' }}
                  />
                  <Stack.Screen
                    name="EditContact"
                    component={EditContactScreen}
                    options={{ title: t('feature.contacts.title.editContact'), headerBackTitleVisible: false }}
                  />
                  <Stack.Screen
                    name="AddContact"
                    component={AddContactScreen}
                    options={{
                      title: t('feature.contacts.title.addContact'),
                      headerLeft: () => null,
                      presentation: 'modal',
                    }}
                  />
                </>
              ) : (
                <Stack.Screen name="OnboardingStack" component={OnboardingContainer} options={{ headerShown: false }} />
              )}
            </Stack.Navigator>
            <Toast />
          </BottomSheetModalProvider>
        )}
      </NavigationContainer>
    </Box>
  )
}
