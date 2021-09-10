import { CredentialState } from '@aries-framework/core'
import { CredentialsThunks } from '@aries-framework/redux-store'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CredentialMetadata } from '@internal/components'
import { ActionResponseModal } from '@internal/components/ActionResponseModal'
import { FormDetail } from '@internal/components/FormDetail'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { formatToDate, getCredentialDisplayName } from '@internal/utils'
import { convertToHumanFriendlyName } from '@internal/utils/attribute'

export interface CredentialOfferScreenRouteParams {
  credentialId: string
}

export interface CredentialOfferScreenProps {
  route: { params: CredentialOfferScreenRouteParams }
}

export const CredentialOfferScreen: React.FunctionComponent<CredentialOfferScreenProps> = ({ route }) => {
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
          i18nKey="feature.credentials.text.offer"
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
