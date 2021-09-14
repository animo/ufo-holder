import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { gutters } from '@components/global-stylesheets'
import { BottomSheet, Button, FlexGroup, FlexItem, Heading, Page, Spacer, Text } from '@components/lib'
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
        {/* TODO: extract to new component */}
        <FlexGroup alignItems="flexEnd" direction="row" style={gutters.mediumBMargin}>
          <FlexItem>
            <Button variant="outline" onPress={onDecline}>
              {t('actions.decline')}
            </Button>
          </FlexItem>
          <Spacer vertical />
          <FlexItem>
            <Button variant="default" color="danger" onPress={onAccept}>
              {t('actions.accept')}
            </Button>
          </FlexItem>
        </FlexGroup>
      </Page>
    </BottomSheet>
  )
}
