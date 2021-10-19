import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Page, Text } from '@components/lib'
import { openSettings } from '@internal/modules'

interface NopermissionProps {
  permission: 'location'
}

export const NoPermissions: React.FunctionComponent<NopermissionProps> = ({ permission }) => {
  const { t } = useTranslation()
  return (
    <Page center>
      <Text align="center">
        {t('noPermissions.text')}
        {t(`noPermissions.${permission}`)}
      </Text>
      <Button variant="link" color="primary" onPress={openSettings}>
        {t('actions.openSettings')}
      </Button>
    </Page>
  )
}
