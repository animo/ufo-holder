import { CredentialState } from '@aries-framework/core'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AvatarListItem, Button, EmergencyBottomSheet, HeaderIconButton, NoContent, Page } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { AppThunks } from '@internal/store/app'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { getConnectionDisplayName, getCredentialDisplayName } from '@internal/utils'

export const CredentialsScreen: React.FunctionComponent = () => {
  const navigation = useAppStackNavigation()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const credentials = useAgentSelector(AriesSelectors.credentialsWithConnectionSelector)

  useEffect(() => {
    const goToInformationScreen = () => {
      navigation.navigate('InformationScreen')
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton type="information-circle-outline" onPress={goToInformationScreen} />,
    })
  }, [navigation])

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

  if (credentials.length === 0) {
    return (
      <>
        <NoContent
          heading={t('feature.credentials.text.noCredentialsTitle')}
          text={t('feature.credentials.text.noCredentials')}
          iconType="card-outline"
        />
        <Button onPress={() => dispatch(AppThunks.newUser())}>Initialize</Button>
      </>
    )
  }
  return (
    <>
      <Button onPress={() => dispatch(AppThunks.emergency({ emergency: true }))}>toggle</Button>
      <Page scrollable>
        {credentials.map(({ connection, credential }) => (
          <AvatarListItem
            showBadge={credential.state === CredentialState.OfferReceived}
            key={credential.id}
            text={getCredentialDisplayName(credential.metadata.schemaId)}
            subText={connection ? getConnectionDisplayName(connection) : undefined}
            onPress={() =>
              credential.state === CredentialState.OfferReceived
                ? onPressCredentialOffer(credential.id)
                : onPressCredentialDetails(credential.id)
            }
            name={getCredentialDisplayName(credential.metadata.schemaId) ?? ''}
          />
        ))}
      </Page>
      <EmergencyBottomSheet title="BRAND" subtitle="Jaarbeursplein, Utrecht" />
    </>
  )
}
