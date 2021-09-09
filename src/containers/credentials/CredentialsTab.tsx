import React from 'react'
import { useTranslation } from 'react-i18next'

import { IconListItem, NoContent, ScrollViewPage } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { getConnectionDisplayName, getCredentialDisplayName } from '@internal/utils'

export const CredentialsTab: React.FunctionComponent = () => {
  const navigation = useAppStackNavigation()
  const { t } = useTranslation()

  const credentials = useAgentSelector(AriesSelectors.credentialsWithConnectionSelector)

  const onPressCredentialDetails = (credentialId: string) => {
    navigation.navigate('CredentialDetail', {
      credentialId,
    })
  }

  if (credentials.length === 0) {
    return (
      <NoContent
        heading={t('feature.credentials.text.noCredentialsTitle')}
        text={t('feature.credentials.text.noCredentials')}
        iconType="card-outline"
      />
    )
  }
  return (
    <ScrollViewPage>
      {credentials.map(({ connection, credential }) => (
        <IconListItem
          key={credential.id}
          text={getCredentialDisplayName(credential.metadata.schemaId)}
          subText={connection ? getConnectionDisplayName(connection) : undefined}
          onPress={() => onPressCredentialDetails(credential.id)}
          iconType="card-outline"
        />
      ))}
    </ScrollViewPage>
  )
}
