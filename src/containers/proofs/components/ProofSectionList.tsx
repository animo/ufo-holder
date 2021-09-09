import type { ProofRecord } from '@aries-framework/core'
import type { PaddingSizes } from '@components/global-stylesheets'
import type { AriesRecord } from '@internal/utils'

import React from 'react'
import { SectionList } from 'react-native'

import { paddingSizes } from '@components/global-stylesheets'
import { FlexGroup, Heading } from '@components/lib'
import { IconListItem } from '@internal/components'
import { useAppNavigation } from '@internal/navigation'
import { proofRecordToListItem } from '@internal/utils'

export interface ProofListProps {
  sections: { title: string; data: AriesRecord[] }[]
  paddingSize?: PaddingSizes
}

export interface ProofHeaderProps {
  title: string
}

export const ProofSectionList: React.FunctionComponent<ProofListProps> = ({ sections, paddingSize = 'xl' }) => {
  const navigation = useAppNavigation()
  const records = Object.values(sections).flatMap((section) => section.data)

  const onProofPress = (id: string) => navigation.navigate('ProofDetail', { proofId: id })

  return (
    <SectionList
      stickySectionHeadersEnabled={false}
      contentContainerStyle={paddingSizes[paddingSize]}
      sections={sections}
      renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
      renderItem={({ item }) => <IconListItem {...proofRecordToListItem(item as ProofRecord, records, onProofPress)} />}
    />
  )
}

export const SectionHeader: React.FunctionComponent<ProofHeaderProps> = ({ title }) => (
  <FlexGroup justifyContent="center" alignItems="center">
    <Heading size="m">{title}</Heading>
  </FlexGroup>
)
