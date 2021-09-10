import { Modal as _Modal } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Spacer } from '@components/lib'

export interface ModalProps {
  title: string
  text: string
  showModal: boolean
  setShowModal: (bool: boolean) => void
  onAccept: () => void
}

// TODO: Unable to close it normally
export const Modal: React.FunctionComponent<ModalProps> = ({ title, text, showModal, setShowModal, onAccept }) => {
  const { t } = useTranslation()
  return (
    <_Modal isOpen={showModal}>
      <_Modal.Content>
        <_Modal.Header>{title}</_Modal.Header>
        <_Modal.Body>{text}</_Modal.Body>
        <_Modal.Footer>
          <Button onPress={() => setShowModal(false)} color="danger" variant="unstyled">
            {t('actions.no')}
          </Button>
          <Spacer size="m" vertical />
          <Button onPress={onAccept} variant="unstyled">
            {t('actions.yes')}
          </Button>
        </_Modal.Footer>
      </_Modal.Content>
    </_Modal>
  )
}
