import React from 'react'

import { ScrollViewPage } from '@components/lib'
import { IconListItem } from '@internal/components'
import { useAppNavigation } from '@internal/navigation'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { recordToListItem } from '@internal/utils'

export const ActionsTab: React.FunctionComponent = () => {
  const navigation = useAppNavigation()

  const actionRecords = useAgentSelector(AriesSelectors.actionRecordsSelector)
  const connectionRecords = useAgentSelector(AriesSelectors.visibleConnectionsSelector)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressConnection = () => {}

  const onPressCredential = (credentialId: string) => {
    navigation.navigate('CredentialOfferModal', { credentialId })
  }

  const onPressProof = (proofId: string) => {
    navigation.navigate('ProofRequestModal', { proofId })
  }

  return (
    <ScrollViewPage>
      {actionRecords.map((record) => (
        <IconListItem
          key={record.id}
          {...recordToListItem(
            record,
            [...actionRecords, ...connectionRecords],
            onPressConnection,
            onPressCredential,
            onPressProof
          )}
        />
      ))}
    </ScrollViewPage>
  )
}
