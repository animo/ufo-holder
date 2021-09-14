import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ScrollViewPage } from '@components/lib'
import { CredentialMetadata, FormDetail } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { formatToDate, getCredentialDisplayName } from '@internal/utils'
import { convertToHumanFriendlyName } from '@internal/utils/attribute'

export interface CredentialDetailRouteParams {
  credentialId: string
}
export interface CredentialDetailScreenProps {
  route: { params: CredentialDetailRouteParams }
}

export const CredentialDetailScreen: React.FunctionComponent<CredentialDetailScreenProps> = ({ route }) => {
  const { t } = useTranslation()
  const navigation = useAppStackNavigation()
  const credentialId = route.params.credentialId
  const { credential, connection } = useAgentSelector(AriesSelectors.credentialWithConnectionByIdSelector(credentialId))

  useEffect(() => {
    if (!credential) {
      return
    }

    navigation.setOptions({
      title: getCredentialDisplayName(credential.metadata.schemaId),
    })
  }, [navigation, credential])

  if (!credential) {
    return null
  }

  return (
    <ScrollViewPage>
      {connection && (
        <CredentialMetadata
          i18nKey="feature.credentials.text.meta"
          connectionRecord={connection}
          credentialName={getCredentialDisplayName(credential.metadata.schemaId)}
          issueDate={formatToDate(credential.createdAt, t('months', { returnObjects: true }))}
        />
      )}
      {credential.credentialAttributes?.map((attribute) => {
        if (attribute.value) {
          return (
            <FormDetail
              text={attribute.value}
              headingText={convertToHumanFriendlyName(attribute.name)}
              key={attribute.name}
            />
          )
        }
      })}
    </ScrollViewPage>
  )
}
