import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { BottomButtonBar } from './BottomButtonBar'

import { BottomSheet, Heading, Page, Spacer, Text } from '@components/lib'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AppSelectors, AppThunks } from '@internal/store/app'

export interface EmergencyBottomSheetProps {
  title: string
  subtitle: string
}

/**
 * @todo custom backdrop component does not work
 * @see https://github.com/gorhom/react-native-bottom-sheet/issues/634
 */
export const EmergencyBottomSheet: React.FunctionComponent<EmergencyBottomSheetProps> = ({ title, subtitle }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const hasEmergency = useAppSelector(AppSelectors.hasEmergencySelector)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  /**
   * @todo proper decline of an emergency
   */
  const onDecline = () => {
    void dispatch(AppThunks.emergency({ emergency: false }))
  }

  /**
   * @todo proper acceptance of an emergency
   */
  const onAccept = () => {
    void dispatch(AppThunks.emergency({ emergency: false }))
  }

  useEffect(() => {
    if (hasEmergency) {
      bottomSheetModalRef.current?.present()
    }
    bottomSheetModalRef.current?.close()
  }, [bottomSheetModalRef, hasEmergency])

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef} emergency>
      <Page>
        <Heading align="center">{title}</Heading>
        <Spacer size="m" />
        <Text color="textSubdued" align="center">
          {subtitle}
        </Text>
        <BottomButtonBar
          buttons={[
            { onPress: onDecline, text: t('actions.decline'), color: 'danger' },
            { onPress: onAccept, text: t('actions.accept') },
          ]}
        />
      </Page>
    </BottomSheet>
  )
}
