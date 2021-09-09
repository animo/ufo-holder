import type { CredentialOptionItem } from '@internal/utils/aries'

import { ProofState } from '@aries-framework/core'
import React from 'react'

import { ProofRequestGroupCard } from '../components/ProofRequestGroupCard'

import { ScrollViewPage } from '@components/lib'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppSelector } from '@internal/store'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { ProofRequestSelectors } from '@internal/store/aries/proofRequest/proofRequest.selectors'
import { formatRetrievedCredentials } from '@internal/utils/aries'

export interface ProofEditRouteParams {
  proofId: string
  selectedAttributes?: {
    [groupName: string]: number
  }
}
export interface ProofEditScreenProps {
  route: { params: ProofEditRouteParams }
}

export const ProofEditScreen: React.FunctionComponent<ProofEditScreenProps> = ({ route }) => {
  const navigation = useAppStackNavigation()

  const { proofId } = route.params
  const { proof } = useAgentSelector(AriesSelectors.proofWithConnectionByIdSelector(proofId))
  const proofRequestData = useAppSelector(ProofRequestSelectors.proofRequestDataSelector(proofId))
  const proofRequest = proof?.requestMessage?.indyProofRequest

  if (proof?.state !== ProofState.RequestReceived || !proofRequest || !proofRequestData) {
    return null
  }

  const onPressEdit = (attribute: CredentialOptionItem) => {
    navigation.navigate('ProofSelection', { attribute, proofId: route.params.proofId })
  }

  const formatted = formatRetrievedCredentials(proofRequestData.retrievedCredentials, proofRequest)

  return (
    <ScrollViewPage>
      {formatted?.attributes.map((attribute) => (
        <ProofRequestGroupCard
          editable
          key={attribute.groupName}
          title={attribute.requests[proofRequestData.selected.attributes[attribute.groupName] ?? 0].displayName}
          request={attribute.requests[proofRequestData.selected.attributes[attribute.groupName] ?? 0]}
          onPressEdit={() => onPressEdit(attribute)}
        />
      ))}
    </ScrollViewPage>
  )
}
