import type { ConnectionRecord } from '@aries-framework/core'

import React from 'react'
import { Trans } from 'react-i18next'

import { gutters } from '@components/global-stylesheets'
import { Panel, Text } from '@components/lib'
import { getConnectionDisplayName } from '@internal/utils'

export interface CredentialMetadataProps {
  connectionRecord: ConnectionRecord
  credentialName?: string
  issueDate: string
  i18nKey: 'feature.actions.text.credentialOfferMessage' | 'feature.credentials.text.credentialMetadata'
}

export const CredentialMetadata: React.FunctionComponent<CredentialMetadataProps> = ({
  connectionRecord,
  credentialName,
  issueDate,
  i18nKey,
}) => {
  if (!connectionRecord) {
    return null
  }

  return (
    <Panel style={gutters.mediumBMargin} paddingSize="xl">
      <Text>
        <Trans
          values={{ connectionName: getConnectionDisplayName(connectionRecord), credentialName, issueDate }}
          i18nKey={i18nKey}
          components={{ bold: <Text weight="bold" /> }}
        />
      </Text>
    </Panel>
  )
}
