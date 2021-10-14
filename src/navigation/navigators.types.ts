import type { CredentialDetailRouteParams } from '@internal/containers'
import type { CredentialOfferScreenRouteParams } from '@internal/containers/credentials/screens/CredentialOfferScreen'
import type { NavigationProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'

import { useNavigation } from '@react-navigation/native'

type RootNavigationParamList = {
  OnboardingStack: undefined

  // Credentials
  CredentialsScreen: undefined
  CredentialOfferScreen: CredentialOfferScreenRouteParams
  CredentialDetailScreen: CredentialDetailRouteParams

  // Meta
  InformationScreen: undefined

  // Maps
  MapsScreen: undefined
}

const useAppNavigation = () => useNavigation<NavigationProp<RootNavigationParamList>>()
const useAppStackNavigation = () => useNavigation<StackNavigationProp<RootNavigationParamList>>()

export { useAppNavigation, useAppStackNavigation }
export type { RootNavigationParamList }
