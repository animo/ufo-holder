import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import BottomSheet from '@gorhom/bottom-sheet'
import { Button } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { HeaderIconButton, IconListItem, NoContent, Page, Text } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { getConnectionDisplayName, getCredentialDisplayName } from '@internal/utils'

export const CredentialsScreen: React.FunctionComponent = () => {
  const navigation = useAppStackNavigation()
  const { t } = useTranslation()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const credentials = useAgentSelector(AriesSelectors.credentialsWithConnectionSelector)

  useEffect(() => {
    const goToInformationScreen = () => {
      navigation.navigate('InformationScreen')
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton iconType="information-circle-outline" onPress={goToInformationScreen} />,
    })
  }, [navigation])

  const onPressCredentialDetails = (credentialId: string) => {
    navigation.navigate('CredentialDetail', {
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
      </>
    )
  }
  return (
    <>
      <Page scrollable>
        {credentials.map(({ connection, credential }) => (
          <IconListItem
            key={credential.id}
            text={getCredentialDisplayName(credential.metadata.schemaId)}
            subText={connection ? getConnectionDisplayName(connection) : undefined}
            onPress={() => onPressCredentialDetails(credential.id)}
            iconType="card-outline"
          />
        ))}
      </Page>
      <BottomSheet snapPoints={['100%']} ref={bottomSheetModalRef}>
        <Text align="center">TODO: Emergency</Text>
      </BottomSheet>
    </>
  )
}
