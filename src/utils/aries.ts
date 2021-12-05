import type { ProofRequest, RetrievedCredentials } from '@aries-framework/core'
import type { ProofRequestData } from '@internal/store/aries/proofRequest/proofRequest.reducer'

import { ConnectionRecord, CredentialRecord, ProofRecord, RequestedCredentials } from '@aries-framework/core'

import { convertToHumanFriendlyName } from './attribute'
import { formatToDDMMYYYY } from './date'

export type AriesRecord = ConnectionRecord | CredentialRecord | ProofRecord

export type CredentialOptionItem = { groupName: string; requests: Requests[] }

export type Requests = {
  displayName: string
  requestedAttributes: { [key: string]: string }
}

export type CredentialOptions = {
  attributes: CredentialOptionItem[]
  predicates: CredentialOptionItem[]
}

// TODO: Lacks predicates support and self-attested attributes
export const formatRetrievedCredentials = (
  retrievedCredentials: RetrievedCredentials,
  proofRequest: ProofRequest
): CredentialOptions => {
  // This shows all the requested attributes with self attested attributes
  const proofRequestAttributes: { attributeNames: string[] }[] = Object.values(proofRequest.requestedAttributes).map(
    (value) => {
      const names = value.name ? [value.name] : value.names ?? []
      return { attributeNames: names }
    }
  )

  const credentialOptionAttributes = Object.entries(retrievedCredentials.requestedAttributes).map(
    ([groupName, requestedAttributeList], index) => {
      const attributeNames = proofRequestAttributes[index].attributeNames

      const requests: Requests[] = requestedAttributeList.map((attribute) => {
        const displayName = convertToHumanFriendlyName(attribute.credentialInfo.schemaId)

        const values = attribute.credentialInfo.attributes

        const requestedAttributes = attributeNames.reduce((prev, name) => {
          return { ...prev, [name]: values[name] }
        }, {})

        return { displayName, requestedAttributes }
      })

      return { groupName, requests }
    }
  )

  return { attributes: credentialOptionAttributes, predicates: [] }
}

export const toRequestedCredentials = ({ retrievedCredentials, selected }: ProofRequestData) => {
  const requestedCredentials = new RequestedCredentials({})

  Object.keys(retrievedCredentials.requestedAttributes).forEach((groupName) => {
    requestedCredentials.requestedAttributes[groupName] =
      retrievedCredentials.requestedAttributes[groupName][selected.attributes[groupName] ?? 0]
  })

  Object.keys(retrievedCredentials.requestedPredicates).forEach((groupName) => {
    requestedCredentials.requestedPredicates[groupName] =
      retrievedCredentials.requestedPredicates[groupName][selected.predicates[groupName] ?? 0]
  })

  return requestedCredentials
}

export const recordToSectionData = (records: AriesRecord[]) => {
  const groups: { [key: string]: AriesRecord[] } = {}
  records.forEach((record) => {
    const sectionDate = formatToDDMMYYYY(record.createdAt)
    const curr = groups[sectionDate] ?? []
    groups[sectionDate] = [...curr, record].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  })
  return Object.entries(groups)
    .map(([title, data]) => ({ title, data }))
    .reverse()
}

export const recordToListItem = (
  record: AriesRecord,
  records: AriesRecord[],
  onConnectionPress: (id: string) => void,
  onCredentialPress: (id: string) => void,
  onProofPress: (id: string) => void
): { text: string; iconType: string; subText?: string; onPress: () => void } => {
  if (record instanceof ConnectionRecord) {
    return connectionRecordToListItem(record, onConnectionPress)
  } else if (record instanceof CredentialRecord) {
    return credentialRecordToListItem(record, records, onCredentialPress)
  } else {
    return proofRecordToListItem(record, records, onProofPress)
  }
}

export const proofRecordToListItem = (record: ProofRecord, records: AriesRecord[], onPress: (id: string) => void) => {
  const connectionRecord = records.find(
    (data) => data instanceof ConnectionRecord && data.id === record.connectionId
  ) as ConnectionRecord | undefined
  return {
    iconType: 'shield-checkmark-outline',
    text: getProofDisplayName(record),
    subText: connectionRecord ? getConnectionDisplayName(connectionRecord) : undefined,
    onPress: () => onPress(record.id),
  }
}

export const credentialRecordToListItem = (
  record: CredentialRecord,
  records: AriesRecord[],
  onPress: (id: string) => void
) => {
  const connectionRecord = records.find(
    (data) => data instanceof ConnectionRecord && data.id === record.connectionId
  ) as ConnectionRecord | undefined

  return {
    iconType: 'card-outline',
    text: getCredentialDisplayName(record),
    subText: connectionRecord ? getConnectionDisplayName(connectionRecord) : undefined,
    onPress: () => onPress(record.id),
  }
}

export const connectionRecordToListItem = (record: ConnectionRecord, onPress: (id: string) => void) => ({
  iconType: 'person-outline',
  text: getConnectionDisplayName(record),
  subText: record.theirLabel !== getConnectionDisplayName(record) ? record.theirLabel : undefined,
  onPress: () => onPress(record.id),
})

export const getAriesRecordDisplayName = (record: AriesRecord) => {
  if (record instanceof ConnectionRecord) {
    return getConnectionDisplayName(record)
  } else if (record instanceof CredentialRecord) {
    return getCredentialDisplayName(record)
  } else if (record instanceof ProofRecord) {
    return getProofDisplayName(record)
  }
}

export const getConnectionDisplayName = (connectionRecord: ConnectionRecord) =>
  convertToHumanFriendlyName(connectionRecord.alias ?? connectionRecord.theirLabel ?? 'Contact')

export const getCredentialDisplayName = (credentialRecord?: CredentialRecord | null) => {
  if (credentialRecord) {
    const credentialInfo = credentialRecord.metadata.get<{ name: string | undefined }>('info')
    if (credentialInfo && credentialInfo.name) {
      return credentialInfo.name
    }
    const indyCredentialInfo = credentialRecord.metadata.get<{ schemaId?: string }>('_internal/indyCredential')
    if (indyCredentialInfo && indyCredentialInfo.schemaId) {
      return getSchemaDisplayName(indyCredentialInfo.schemaId)
    }
  }

  return 'credential'
}

export const getSchemaDisplayName = (schemaId: string) => {
  const schemaName = schemaId.split(':')[2]
  return convertToHumanFriendlyName(schemaName)
}

export const getProofDisplayName = (proofRecord: ProofRecord) =>
  convertToHumanFriendlyName(proofRecord.requestMessage?.indyProofRequest?.name ?? 'Proof')

export const convertProofAttributes = (proofRecord: ProofRecord) => {
  const requestedAttributes = Object.entries(
    proofRecord.presentationMessage?.indyProof?.requested_proof.revealed_attrs ?? {}
  ).map(([key, value]) => {
    return { key, value: value.raw }
  })
  const requestedAttributeInGroups = Object.entries(
    proofRecord.presentationMessage?.indyProof?.requested_proof.revealed_attr_groups ?? {}
  ).flatMap(([, value]) => {
    return Object.entries(value.values).flatMap(([key, val]) => {
      return { key, value: val.raw }
    })
  })
  return [...requestedAttributes, ...requestedAttributeInGroups]
}
