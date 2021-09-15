import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { paddingSize } from '@components/global-constants'
import { gutters, layout } from '@components/global-stylesheets'
import { Box, Page, Button, FlexItem } from '@components/lib'

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
      <Page scrollable>{children}</Page>
      <Box
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
          <Button variant="outline" color="danger" onPress={onDecline}>
            {t('actions.decline')}
          </Button>
        </FlexItem>
        <FlexItem style={gutters.mediumHPadding}>
          <Button onPress={onAccept}>{t('actions.accept')}</Button>
        </FlexItem>
      </Box>
    </>
  )
}
