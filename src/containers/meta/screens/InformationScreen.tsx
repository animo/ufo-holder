import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

import { HeaderIconButton, Modal, Page, Text } from '@components/lib'
import { useAppNavigation } from '@internal/navigation'

export const InformationScreen = () => {
  const { t } = useTranslation()
  const navigation = useAppNavigation()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const onShowModal = () => {
      setShowModal(true)
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton type="exit-outline" onPress={onShowModal} color="danger" />,
    })
  }, [navigation])

  // TODO: delete account
  const onDeleteAccount = () => {
    setShowModal(false)
    Alert.alert('Account Deleted!')
    navigation.goBack()
  }

  return (
    <>
      <Page scrollable>
        <Text>{t('feature.information.text.information')}</Text>
      </Page>
      <Modal
        title={t('feature.information.titles.modal')}
        text={t('feature.information.text.modal')}
        setShowModal={setShowModal}
        showModal={showModal}
        onAccept={onDeleteAccount}
      />
    </>
  )
}
