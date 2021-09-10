import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

import { HeaderIconButton, Page, Text } from '@components/lib'
import { useAppNavigation } from '@internal/navigation'

export const InformationScreen = () => {
  const { t } = useTranslation()
  const navigation = useAppNavigation()

  useEffect(() => {
    // TODO: Delete account
    const onDeleteAccount = () => {
      Alert.alert('ACCOUNT DELETED')
      navigation.goBack()
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton iconType="exit-outline" onPress={onDeleteAccount} iconColor="danger" />,
    })
  }, [navigation])

  return (
    <Page scrollable>
      <Text>{t('feature.information.text.information')}</Text>
    </Page>
  )
}
