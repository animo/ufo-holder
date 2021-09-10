import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import { CredentialsThunks } from '@aries-framework/redux-store'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { HeaderIconButton, ScrollViewPage } from '@components/lib'
import { CredentialMetadata, FormDetail } from '@internal/components'
import { DeleteBottomSheet } from '@internal/components/DeleteBottomSheet'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { formatToDate, getCredentialDisplayName } from '@internal/utils'
import { convertToHumanFriendlyName } from '@internal/utils/attribute'

export interface CredentialDetailRouteParams {
  credentialId: string
}
export interface CredentialDetailScreenProps {
  route: { params: CredentialDetailRouteParams }
}

export const CredentialDetailScreen: React.FunctionComponent<CredentialDetailScreenProps> = ({ route }) => {
  const { t } = useTranslation()
  const navigation = useAppStackNavigation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const credentialId = route.params.credentialId
  const { credential, connection } = useAgentSelector(AriesSelectors.credentialWithConnectionByIdSelector(credentialId))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!credential) {
      return
    }
    const onShowDeleteCredential = () => {
      bottomSheetModalRef.current?.present()
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton onPress={onShowDeleteCredential} iconType="trash-outline" />,
      title: getCredentialDisplayName(credential.metadata.schemaId),
    })
  }, [navigation, credential])

  const onDeleteCredential = () => {
    if (credential) {
      void dispatch(CredentialsThunks.deletCredential(credential.id))
    }
    bottomSheetModalRef.current?.close()
    navigation.goBack()
  }

  if (!credential) {
    return null
  }

  return (
    <>
      <ScrollViewPage>
        {connection && (
          <CredentialMetadata
            i18nKey="feature.credentials.text.meta"
            connectionRecord={connection}
            credentialName={getCredentialDisplayName(credential.metadata.schemaId)}
            issueDate={formatToDate(credential.createdAt, t('months', { returnObjects: true }))}
          />
        )}
        {credential.credentialAttributes?.map((attribute) => {
          if (attribute.value) {
            return (
              <FormDetail
                text={attribute.value}
                headingText={convertToHumanFriendlyName(attribute.name)}
                key={attribute.name}
              />
            )
          }
        })}
      </ScrollViewPage>
      <DeleteBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onDelete={onDeleteCredential}
        description={`${t('feature.credentials.text.delete')}`}
      />
    </>
  )
}
