import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ActionResponseModal } from '../components/ActionResponseModal'

import { borderRadiusSizes, gutters, layout } from '@components/global-stylesheets'
import { Box, Button, FlexGroup, FlexItem, HeaderIconButton, Icon, Text } from '@components/lib'
import { FormDetail, Heading, Spacer } from '@internal/components'
import { ProofMetadata } from '@internal/components/ProofMetadata'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { ProofRequestSelectors } from '@internal/store/aries/proofRequest/proofRequest.selectors'
import { ProofRequestThunks } from '@internal/store/aries/proofRequest/proofRequest.thunks'
import { formatToDate, getProofDisplayName } from '@internal/utils'
import { convertToHumanFriendlyName } from '@internal/utils/attribute'

export interface ProofModalRouteParams {
  proofId: string
}

export interface ProofModalScreenProps {
  route: { params: ProofModalRouteParams }
}

export const ProofModalScreen: React.FunctionComponent<ProofModalScreenProps> = ({ route }) => {
  const { t } = useTranslation()
  const navigation = useAppStackNavigation()
  const dispatch = useAppDispatch()

  const { proofId } = route.params
  const { proof, connection } = useAgentSelector(AriesSelectors.proofWithConnectionByIdSelector(proofId))
  const proofRequestData = useAppSelector(ProofRequestSelectors.proofRequestDataSelector(proofId))
  const canCompleteProofRequest = useAppSelector(ProofRequestSelectors.canCompleteProofRequest(proofId))
  const currentSelectedAttributes = useAppSelector(ProofRequestSelectors.currentSelectedAttributes(proofId))

  // Retrieve proof data
  useEffect(() => {
    if (!proofRequestData) {
      void dispatch(ProofRequestThunks.getCredentialOptionsForProofRequest({ proofRecordId: proofId }))
    }
  }, [proofRequestData, dispatch, proofId])

  // Set navigation header
  useEffect(() => {
    if (proof) {
      const onEditProof = () => {
        navigation.navigate('ProofRequestEdit', { proofId })
      }

      navigation.setOptions({
        headerRight: () => <HeaderIconButton onPress={onEditProof} iconType="create-outline" />,
        title: convertToHumanFriendlyName(getProofDisplayName(proof)),
      })
    }
  }, [proof, navigation, proofId])

  if (!proof || !proof.requestMessage?.indyProofRequest) {
    navigation.goBack()
    return null
  }

  if (!proofRequestData) {
    return null
  }

  const onDeclineProofRequest = () => {
    void dispatch(ProofRequestThunks.declineRequest({ proofRecordId: proof.id }))
    navigation.goBack()
  }

  const onAcceptProofRequest = () => {
    void dispatch(ProofRequestThunks.acceptRequest({ proofRecordId: proof.id }))
    navigation.goBack()
  }

  if (!canCompleteProofRequest) {
    return (
      <Box fill paddingSize="l">
        <FlexGroup>
          <FlexItem justifyContent="center" alignItems="center">
            <Box paddingSize="xl" center>
              <Icon iconType="close-circle" iconSize={120} iconColor="danger" />
              <Spacer />
              <Heading align="center">{t('feature.actions.title.cantCompleteRequest')}</Heading>
              <Text align="center">{t('feature.actions.text.noAvailableAttributes')}</Text>
            </Box>
          </FlexItem>
          <FlexItem grow={false}>
            <Button
              onPress={onDeclineProofRequest}
              color="danger"
              variant="plain"
              style={[layout.fullWidth, gutters.mediumBMargin]}
            >
              {t('feature.actions.action.deleteRequest')}
            </Button>
          </FlexItem>
        </FlexGroup>
      </Box>
    )
  }

  return (
    <ActionResponseModal onAccept={onAcceptProofRequest} onDecline={onDeclineProofRequest}>
      {connection && (
        <ProofMetadata
          connectionRecord={connection}
          requestDate={formatToDate(proof.createdAt, t('months', { returnObjects: true }))}
          proofName={getProofDisplayName(proof)}
          i18nKey="feature.actions.text.proofRequestMessage"
        />
      )}
      {currentSelectedAttributes.map((e) =>
        Object.entries(e).map(([key, value]) => {
          return (
            <Box key={key} style={borderRadiusSizes.s}>
              <FormDetail
                headingText={convertToHumanFriendlyName(key)}
                text={convertToHumanFriendlyName(value)}
                key={key}
              />
            </Box>
          )
        })
      )}
    </ActionResponseModal>
  )
}
