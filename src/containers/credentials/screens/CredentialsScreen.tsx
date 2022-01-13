import { CredentialState } from '@aries-framework/core'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

import { AvatarListItem, Button, HeaderIconButton, NoContent, Page } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { AppThunks } from '@internal/store/app'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { images } from '@internal/theme/images'
import { getConnectionDisplayName, getCredentialDisplayName } from '@internal/utils'

export const CredentialsScreen: React.FunctionComponent = () => {
  const navigation = useAppStackNavigation()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const credentials = useAgentSelector(AriesSelectors.credentialsWithConnectionSelector)

  useEffect(() => {
    const onNavigateToTravelMode = () => {
      navigation.navigate('TravelModeScreen')
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton onPress={onNavigateToTravelMode} type="car-outline" />,
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

  const onPressPilotButton = () => {
    Alert.alert(
      'Pilot',
      'Weet u het zeker? Hiermee wordt uw account verwijderd. Doe dit alleen als hier bericht over krijgt',
      [
        {
          text: 'NEE',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => await dispatch(AppThunks.resetWallet()),
        },
      ]
    )
  }

  let Content = () => <NoContent heading={t('feature.credentials.text.noCredentialsTitle')} image={images.noData} />

  if (credentials.length > 0) {
    Content = () => (
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

  return (
    <>
      <Content />
      <Button onPress={onPressPilotButton}>PILOT RESET</Button>
    </>
  )
}
