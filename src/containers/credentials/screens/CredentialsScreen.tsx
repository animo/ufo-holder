import type { H3Resolution } from '@internal/utils'

import { CredentialState } from '@aries-framework/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import GeoLocation from 'react-native-geolocation-service'

import { AvatarListItem, Button, Input, Page } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { GeoActions, GeoSelectors, GeoThunks } from '@internal/store/geo'
import { getConnectionDisplayName, getCredentialDisplayName, getCurrentIndex } from '@internal/utils'

export const CredentialsScreen: React.FunctionComponent = () => {
  const navigation = useAppStackNavigation()
  const { t } = useTranslation()
  const [res, setRes] = useState<H3Resolution>(0)
  const dispatch = useAppDispatch()

  const credentials = useAgentSelector(AriesSelectors.credentialsWithConnectionSelector)
  const resolution = useAppSelector(GeoSelectors.resolutionSelector)
  const hexIndex = useAppSelector(GeoSelectors.hexIndexSelector)

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

  const setResolution = () => {
    GeoLocation.getCurrentPosition((position) => {
      const index = getCurrentIndex({ latitude: position.coords.latitude, longitude: position.coords.longitude }, res)
      void dispatch(GeoActions.setResolution({ resolution: res }))
      void dispatch(GeoActions.setHexIndex({ hexIndex: index }))
    })
  }

  //let Content = () => <NoContent heading={t('feature.credentials.text.noCredentialsTitle')} image={images.noData} />
  let Content = () => <View />

  if (credentials.length) {
    Content = () => (
      <Page scrollable>
        {credentials.map(({ credential, connection }) => (
          <AvatarListItem
            showBadge={credential.state === CredentialState.OfferReceived}
            key={credential.id}
            text={getCredentialDisplayName(credential)}
            subText={connection ? getConnectionDisplayName(connection) : undefined}
            onPress={() =>
              credential.state === CredentialState.OfferReceived
                ? onPressCredentialOffer(credential.id)
                : onPressCredentialDetails(credential.id)
            }
            name={getCredentialDisplayName(credential) ?? ''}
          />
        ))}
      </Page>
    )
  }

  const x = () => {
    void dispatch(GeoThunks.setupTaskManager())
  }

  return (
    <>
      <Content />
      <Text>hexIndex: {hexIndex}</Text>
      <Text>Resolution: {resolution}</Text>
      <Button onPress={() => navigation.navigate('MapsScreen')}>DEBUG Map</Button>
      <Input
        placeholder="resolution (0 < res < 15)"
        onChange={(e) => {
          let val = +e.nativeEvent.text
          if (val > 15) {
            val = 15
          }
          if (val < 0) {
            val = 0
          }
          setRes(val as H3Resolution)
        }}
      />
      <Button onPress={setResolution}>DEBUG Resolution</Button>
      <Button onPress={x}>DEBUG TaskManager</Button>
    </>
  )
}
