import type { ConnectionRecord } from '@aries-framework/core'

import React from 'react'
import { Trans } from 'react-i18next'

import { gutters } from '@components/global-stylesheets'
import { Panel, Text } from '@components/lib'
import { getConnectionDisplayName } from '@internal/utils'

export interface ProofMetadataProps {
  connectionRecord: ConnectionRecord
  proofName: string
  requestDate: string
  i18nKey: 'feature.actions.text.proofRequestMessage' | 'feature.proofs.text.proofMetadata'
}

export const ProofMetadata: React.FunctionComponent<ProofMetadataProps> = ({
  connectionRecord,
  proofName,
  requestDate,
  i18nKey,
}) => {
  return (
    <Panel style={gutters.mediumBMargin} paddingSize="xl">
      <Text>
        <Trans
          values={{ connectionName: getConnectionDisplayName(connectionRecord), proofName, requestDate }}
          i18nKey={i18nKey}
          components={{ bold: <Text weight="bold" /> }}
        />
      </Text>
    </Panel>
  )
}
