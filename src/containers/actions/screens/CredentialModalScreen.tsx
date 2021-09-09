import { CredentialState } from '@aries-framework/core'
import { CredentialsThunks } from '@aries-framework/redux-store'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ActionResponseModal as ActionResponseModal } from '../components/ActionResponseModal'

import { CredentialMetadata } from '@internal/components'
import { FormDetail } from '@internal/components/FormDetail'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { formatToDate, getCredentialDisplayName } from '@internal/utils'
import { convertToHumanFriendlyName } from '@internal/utils/attribute'

export interface CredentialModalRouteParams {
  credentialId: string
}

export interface CredentialModalScreenProps {
  route: { params: CredentialModalRouteParams }
}

export const CredentialModalScreen: React.FunctionComponent<CredentialModalScreenProps> = ({ route }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useAppStackNavigation()
  const { credential, connection } = useAgentSelector(
    AriesSelectors.credentialWithConnectionByIdSelector(route.params.credentialId)
  )

  if (!credential || credential.state !== CredentialState.OfferReceived) {
    return null
  }

  const onAcceptCredentialOffer = () => {
    void dispatch(CredentialsThunks.acceptOffer({ credentialId: credential.id }))
    navigation.goBack()
  }

  const onDeclineCredentialOffer = () => {
    void dispatch(CredentialsThunks.deletCredential(credential.id))
    navigation.goBack()
  }

  return (
    <ActionResponseModal onAccept={onAcceptCredentialOffer} onDecline={onDeclineCredentialOffer}>
      {connection && (
        <CredentialMetadata
          i18nKey="feature.actions.text.credentialOfferMessage"
          connectionRecord={connection}
          credentialName={getCredentialDisplayName(credential.metadata.schemaId)}
          issueDate={formatToDate(credential.createdAt, t('months', { returnObjects: true }))}
        />
      )}
      {credential.credentialAttributes?.map((attribute) => (
        <FormDetail
          text={attribute.value}
          headingText={convertToHumanFriendlyName(attribute.name)}
          key={attribute.name}
        />
      ))}
    </ActionResponseModal>
  )
}
