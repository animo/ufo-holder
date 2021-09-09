import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { paddingSize } from '@components/global-constants'
import { gutters, layout } from '@components/global-stylesheets'
import { Button, FlexItem, Panel, ScrollViewPage, Text } from '@internal/components'

export interface ActionResponseModalProps {
  onDecline: () => void
  onAccept: () => void
}

export const ActionResponseModal: React.FunctionComponent<ActionResponseModalProps> = ({
  onAccept,
  onDecline,
  children,
}) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  return (
    <>
      <ScrollViewPage>{children}</ScrollViewPage>
      <Panel
        paddingSize="l"
        style={[
          layout.row,
          {
            // Make sure we have a bottom padding of at least the required safe context inset
            // But can be higher if the padding is higher
            paddingBottom: Math.max(insets.bottom, paddingSize.l),
          },
        ]}
      >
        <FlexItem style={gutters.mediumHPadding}>
          <Button variant="outline" onPress={onDecline} color="danger">
            <Text color="danger">{t('action.decline')}</Text>
          </Button>
        </FlexItem>
        <FlexItem style={gutters.mediumHPadding}>
          <Button onPress={onAccept}>{t('action.accept')}</Button>
        </FlexItem>
      </Panel>
    </>
  )
}
