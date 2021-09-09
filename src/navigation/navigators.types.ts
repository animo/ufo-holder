import type { MainTabsNavigationParamsList } from './MainTabs'
import type {
  AddContactRouteParams,
  CredentialDetailRouteParams,
  CredentialModalRouteParams,
  EditContactRouteParams,
  ProofModalRouteParams,
  ProofSelectionRouteParams,
} from '@internal/containers'
import type { ProofEditRouteParams } from '@internal/containers/actions/screens/ProofEditScreen'
import type { ProofDetailRouteParams } from '@internal/containers/proofs/screens/ProofDetailScreen'
import type { NavigationProp, NavigatorScreenParams } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'

import { useNavigation } from '@react-navigation/native'

type RootNavigationParamList = {
  MainTabs: NavigatorScreenParams<MainTabsNavigationParamsList>
  OnboardingStack: undefined

  // Actions
  CredentialOfferModal: CredentialModalRouteParams
  ProofRequestModal: ProofModalRouteParams
  ProofRequestEdit: ProofEditRouteParams
  ProofSelection: ProofSelectionRouteParams

  // Credentials
  CredentialDetail: CredentialDetailRouteParams

  // Proofs
  ProofDetail: ProofDetailRouteParams

  // Contacts
  EditContact: EditContactRouteParams
  InvitationQrScanner: undefined
  AddContact: AddContactRouteParams
  ContactsTab: undefined
}

const useAppNavigation = () => useNavigation<NavigationProp<RootNavigationParamList>>()
const useAppStackNavigation = () => useNavigation<StackNavigationProp<RootNavigationParamList>>()

export { useAppNavigation, useAppStackNavigation }
export type { RootNavigationParamList }
