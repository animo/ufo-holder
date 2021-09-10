import type { CredentialDetailRouteParams } from '@internal/containers'
import type { CredentialOfferScreenRouteParams } from '@internal/containers/credentials/screens/CredentialModalScreen'
import type { NavigationProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'

import { useNavigation } from '@react-navigation/native'

type RootNavigationParamList = {
  OnboardingStack: undefined

  // Credentials
  CredentialsScreen: undefined
  CredentialOfferScreen: CredentialOfferScreenRouteParams
  CredentialDetail: CredentialDetailRouteParams

  // Meta
  InformationScreen: undefined
}

const useAppNavigation = () => useNavigation<NavigationProp<RootNavigationParamList>>()
const useAppStackNavigation = () => useNavigation<StackNavigationProp<RootNavigationParamList>>()

export { useAppNavigation, useAppStackNavigation }
export type { RootNavigationParamList }
