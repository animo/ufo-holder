import { Spacer, TextArea } from 'native-base'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { sendFeedback } from '@internal/api'
import { Button, Page, Text } from '@internal/components'
import { useAppNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { AppActions, AppThunks } from '@internal/store/app/app.reducer'

export const FeedbackScreen = () => {
  const navigation = useAppNavigation()
  const [feedback, setFeedback] = useState('')
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  // TODO: RESET STATE
  //       SEND FEEDBACK
  const onSendFeedback = async () => {
    sendFeedback(feedback)
    await dispatch(AppThunks.doneEmergency())
    dispatch(AppActions.setFinishedEmergency())
    navigation.navigate('CredentialsScreen')
  }

  return (
    <Page>
      <Text>{t('feature.feedback.text')}</Text>
      <TextArea value={feedback} onChangeText={setFeedback} totalLines={13} />
      <Spacer />
      <Spacer />
      <Button onPress={onSendFeedback}>Inzenden</Button>
    </Page>
  )
}
