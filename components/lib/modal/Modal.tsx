import { Modal as _Modal } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Heading, Spacer, Text } from '@components/lib'
import { useAppTheme } from '@components/theme'

export interface ModalProps {
  title: string
  text: string
  showModal: boolean
  setShowModal: (bool: boolean) => void
  onAccept: () => void
}

export const Modal: React.FunctionComponent<ModalProps> = ({ title, text, showModal, setShowModal, onAccept }) => {
  const { t } = useTranslation()
  const { colors } = useAppTheme()
  return (
    <_Modal isOpen={showModal} overlayVisible={false}>
      <_Modal.Content bg={colors.background[500]}>
        <_Modal.Header>
          <Heading>{title}</Heading>
        </_Modal.Header>
        <_Modal.Body>
          <Text>{text}</Text>
        </_Modal.Body>
        <_Modal.Footer>
          <Button onPress={() => setShowModal(false)}>{t('actions.no')}</Button>
          <Spacer size="m" vertical />
          <Button onPress={onAccept} color="danger">
            {t('actions.yes')}
          </Button>
        </_Modal.Footer>
      </_Modal.Content>
    </_Modal>
  )
}
