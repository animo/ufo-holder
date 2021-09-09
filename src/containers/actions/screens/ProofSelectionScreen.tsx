import type { CredentialOptionItem } from '@internal/utils'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { ProofRequestGroupCard } from '../components/ProofRequestGroupCard'

import { Button, ScrollViewPage } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { ProofRequestActions } from '@internal/store/aries/proofRequest/proofRequest.reducer'
import { ProofRequestSelectors } from '@internal/store/aries/proofRequest/proofRequest.selectors'

export interface ProofSelectionRouteParams {
  attribute: CredentialOptionItem
  proofId: string
}

export interface ProofSelectionScreenProps {
  route: { params: ProofSelectionRouteParams }
}

// TODO: better button design
export const ProofSelectionScreen: React.FunctionComponent<ProofSelectionScreenProps> = ({ route }) => {
  const { attribute, proofId } = route.params
  const navigation = useAppStackNavigation()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const proofRequestData = useAppSelector(ProofRequestSelectors.proofRequestDataSelector(proofId))

  const onSelectCredential = (index: number) => {
    void dispatch(
      ProofRequestActions.setSelectedAttributeForGroup({
        proofRecordId: proofId,
        groupName: attribute.groupName,
        selectedIndex: index,
      })
    )
    navigation.goBack()
  }

  if (!proofRequestData) {
    return null
  }

  return (
    <ScrollViewPage>
      {attribute.requests.map((request, index) => {
        const selected = (proofRequestData.selected.attributes[attribute.groupName] ?? 0) === index

        return (
          <ProofRequestGroupCard
            key={`${request.displayName ?? ''}:${index}`}
            title={request.displayName}
            request={attribute.requests[index]}
          >
            <Button
              onPress={() => onSelectCredential(index)}
              variant="outline"
              color={selected ? 'success' : 'primary'}
              disabled={selected}
            >
              {selected ? t('action.selected') : t('action.select')}
            </Button>
          </ProofRequestGroupCard>
        )
      })}
    </ScrollViewPage>
  )
}
