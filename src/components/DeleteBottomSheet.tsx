import type { BottomSheetProps } from '@components/lib/bottomSheet/BottomSheet'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { BottomSheet, Button, FlexGroup, FlexItem, Heading, Spacer, Text } from '@internal/components'

export interface DeleteBottomSheetProps extends BottomSheetProps {
  onDelete: () => void
  title?: string
  description?: string
}

export const DeleteBottomSheet: React.FunctionComponent<DeleteBottomSheetProps> = ({
  onDelete,
  bottomSheetModalRef,
  description,
}) => {
  const { t } = useTranslation()

  return (
    <BottomSheet bottomSheetModalRef={bottomSheetModalRef}>
      <Heading size="m">{t('actions.delete')}</Heading>
      <Spacer />
      <Text>{description}</Text>
      <Spacer size="l" />
      <FlexGroup direction="row" flex={false}>
        <FlexItem>
          <Button variant="outline" onPress={() => bottomSheetModalRef.current?.dismiss()}>
            {t('actions.cancel')}
          </Button>
        </FlexItem>
        <Spacer vertical />
        <FlexItem>
          <Button variant="default" color="danger" onPress={onDelete}>
            {t('actions.delete')}
          </Button>
        </FlexItem>
      </FlexGroup>
    </BottomSheet>
  )
}
