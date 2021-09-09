import type { ConnectionRecord } from '@aries-framework/core'

import React, { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { HeaderIconButton, ScrollViewPage } from '@components/lib'
import { AvatarListItem } from '@internal/components/AvatarListItem'
import { NoContent } from '@internal/components/NoContent'
import { useAppStackNavigation } from '@internal/navigation'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { formatToDate } from '@internal/utils'
import { getConnectionDisplayName } from '@internal/utils/aries'

export const ContactsTab: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const navigation = useAppStackNavigation()
  const connections = useAgentSelector(AriesSelectors.visibleConnectionsSelector)

  useLayoutEffect(() => {
    const onScanInvitation = () => {
      navigation.navigate('InvitationQrScanner')
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton onPress={onScanInvitation} iconType="qr-code-outline" />,
    })
  }, [navigation])

  const onEditContact = (connection: ConnectionRecord) => {
    navigation.navigate('EditContact', { connectionId: connection?.id })
  }

  if (connections.length === 0) {
    return <NoContent text={t('feature.contacts.text.noConnection')} iconType="people-circle-outline" />
  }

  return (
    <ScrollViewPage>
      {connections.map((c) => (
        <AvatarListItem
          text={getConnectionDisplayName(c)}
          subText={`Added on ${formatToDate(c.createdAt, t('months', { returnObjects: true }))}`}
          key={c.id}
          onPress={() => onEditContact(c)}
          name={getConnectionDisplayName(c)}
          id={c.id}
        />
      ))}
    </ScrollViewPage>
  )
}
