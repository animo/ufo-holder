import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ConnectionsSelectors, ConnectionThunks } from '@aries-framework/redux-store'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FlexGroup, FlexItem, FormField, HeaderIconButton, Page } from '@internal/components'
import { DeleteBottomSheet } from '@internal/components/DeleteBottomSheet'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { AriesThunks, useAgentSelector } from '@internal/store/aries'
import { getConnectionDisplayName } from '@internal/utils'

export interface EditContactRouteParams {
  connectionId: string
}

export interface EditContactScreenProps {
  route: { params: EditContactRouteParams }
}

// TODO: use redux for navigation
export const EditContactScreen: React.FunctionComponent<EditContactScreenProps> = ({ route }) => {
  const connectionId = route.params.connectionId
  const connectionRecord = useAgentSelector(ConnectionsSelectors.connectionRecordByIdSelector(connectionId))
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigation = useAppStackNavigation()
  const [alias, setAlias] = useState<string>()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  useLayoutEffect(() => {
    const onShowDeleteConnection = () => {
      bottomSheetModalRef.current?.present()
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton onPress={onShowDeleteConnection} iconType="trash-outline" />,
    })
  }, [alias, connectionId, dispatch, navigation])

  if (!connectionRecord) {
    return null
  }

  const onSubmitAlias = () => {
    void dispatch(
      AriesThunks.updateConnectionAlias({
        connectionId,
        alias: alias && alias.length > 0 ? alias : undefined,
      })
    )
  }

  const onDelete = () => {
    void dispatch(ConnectionThunks.deleteConnection(connectionRecord.id))
    bottomSheetModalRef.current?.close()
    navigation.goBack()
  }

  return (
    <Page>
      <FlexGroup>
        <FlexItem>
          <FormField
            onChangeText={setAlias}
            headingText={t('feature.contacts.input.contactName.header')}
            helpText={t('feature.contacts.input.contactName.help')}
            placeholder={connectionRecord.theirLabel}
            defaultValue={getConnectionDisplayName(connectionRecord)}
            onBlur={onSubmitAlias}
          />
        </FlexItem>
      </FlexGroup>
      <DeleteBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onDelete={onDelete}
        description={t('feature.contacts.text.deleteConnection', {
          name: getConnectionDisplayName(connectionRecord),
        })}
      />
    </Page>
  )
}
