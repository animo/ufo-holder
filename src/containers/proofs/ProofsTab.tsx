import React from 'react'
import { useTranslation } from 'react-i18next'

import { ProofSectionList } from './components/ProofSectionList'

import { NoContent } from '@internal/components'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { recordToSectionData } from '@internal/utils'

export const ProofsTab: React.FunctionComponent = () => {
  const { t } = useTranslation()

  const proofRecords = useAgentSelector(AriesSelectors.sharedProofsSelector)

  if (proofRecords.length === 0) {
    return <NoContent text={t('feature.proofs.text.noProofs')} iconType="chatbubbles-outline" />
  }

  return <ProofSectionList sections={recordToSectionData(proofRecords)} />
}
