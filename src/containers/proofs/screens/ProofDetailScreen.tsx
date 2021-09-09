import type { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ProofsThunks } from '@aries-framework/redux-store'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { HeaderIconButton, ScrollViewPage } from '@components/lib'
import { FormDetail } from '@internal/components'
import { DeleteBottomSheet } from '@internal/components/DeleteBottomSheet'
import { ProofMetadata } from '@internal/components/ProofMetadata'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { convertProofAttributes, formatToDate, getProofDisplayName } from '@internal/utils'
import { convertToHumanFriendlyName } from '@internal/utils/attribute'

export interface ProofDetailRouteParams {
  proofId: string
}
export interface ProofDetailScreenProps {
  route: { params: ProofDetailRouteParams }
}

export const ProofDetailScreen: React.FunctionComponent<ProofDetailScreenProps> = ({ route }) => {
  const { t } = useTranslation()
  const navigation = useAppStackNavigation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const proofId = route.params.proofId
  const { proof, connection } = useAgentSelector(AriesSelectors.proofWithConnectionByIdSelector(proofId))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!proof) {
      return
    }

    const onShowDeleteProof = () => {
      bottomSheetModalRef.current?.present()
    }

    navigation.setOptions({
      headerRight: () => <HeaderIconButton onPress={onShowDeleteProof} iconType="trash-outline" />,
      title: getProofDisplayName(proof),
    })
  }, [navigation, proof])

  const onDeleteProof = () => {
    void dispatch(ProofsThunks.deleteProof(proofId))
    bottomSheetModalRef.current?.close()
    navigation.goBack()
  }

  if (!proof) {
    return null
  }

  return (
    <>
      <ScrollViewPage>
        {connection && (
          <ProofMetadata
            connectionRecord={connection}
            requestDate={formatToDate(proof.createdAt, t('months', { returnObjects: true }))}
            proofName={convertToHumanFriendlyName(getProofDisplayName(proof))}
            i18nKey="feature.proofs.text.proofMetadata"
          />
        )}
        {convertProofAttributes(proof).map(({ key, value }) => (
          <FormDetail text={value} headingText={convertToHumanFriendlyName(key)} key={key} />
        ))}
      </ScrollViewPage>

      <DeleteBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        onDelete={onDeleteProof}
        description={`${t('feature.proofs.text.deleteProof')}`}
      />
    </>
  )
}
