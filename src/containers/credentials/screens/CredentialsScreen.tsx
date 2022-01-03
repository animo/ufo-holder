import { CredentialState } from '@aries-framework/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { AvatarListItem, NoContent, Page } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { images } from '@internal/theme/images'
import { getConnectionDisplayName, getCredentialDisplayName } from '@internal/utils'

export const CredentialsScreen: React.FunctionComponent = () => {
  const navigation = useAppStackNavigation()
  const { t } = useTranslation()

  const credentials = useAgentSelector(AriesSelectors.credentialsWithConnectionSelector)

  const onPressCredentialDetails = (credentialId: string) => {
    navigation.navigate('CredentialDetailScreen', {
      credentialId,
    })
  }

  const onPressCredentialOffer = (credentialId: string) => {
    navigation.navigate('CredentialOfferScreen', {
      credentialId,
    })
  }

  if (credentials.length === 0)
    return <NoContent heading={t('feature.credentials.text.noCredentialsTitle')} image={images.noData} />

  return (
    <Page scrollable>
      {credentials.map(({ credential, connection }) => (
        <AvatarListItem
          showBadge={credential.state === CredentialState.OfferReceived}
          key={credential.id}
          text={getCredentialDisplayName(credential)}
          subText={getConnectionDisplayName(connection)}
          onPress={() =>
            credential.state === CredentialState.OfferReceived
              ? onPressCredentialOffer(credential.id)
              : onPressCredentialDetails(credential.id)
          }
          name={getCredentialDisplayName(credential)}
        />
      ))}
    </Page>
  )
}
