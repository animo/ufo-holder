import type { ProofsState } from '@aries-framework/redux-store/build/slices/proofs/proofsSlice'
import type { RootState } from '@internal/store'

import { ProofsSelectors } from '@aries-framework/redux-store'
import { createSelector } from '@reduxjs/toolkit'

import { formatRetrievedCredentials } from '@internal/utils'

const proofRequestStateSelector = (state: RootState) => state.aries.proofRequests
const proofRequestDataSelector = (proofRecordId: string) =>
  createSelector(proofRequestStateSelector, (proofRequestState) => {
    return proofRequestState[proofRecordId]
  })

const ProofRequestSelectors = {
  proofRequestStateSelector,
  proofRequestDataSelector,
  canCompleteProofRequest: (proofRecordId: string) =>
    createSelector(proofRequestDataSelector(proofRecordId), (proofRequestData) => {
      if (!proofRequestData) {
        return false
      }

      // All entries have at least one credentials
      // TODO: take into account predicates and loose requirements
      return Object.values(proofRequestData.retrievedCredentials.requestedAttributes).every((a) => a.length > 0)
    }),
  currentSelectedAttributes: (proofRecordId: string) =>
    createSelector(
      [
        proofRequestDataSelector(proofRecordId),
        (state: { aries: { proofs: ProofsState } }) =>
          ProofsSelectors.proofRecordByIdSelector(proofRecordId)(state.aries),
      ],
      (proofRequestData, proof): Record<string, string>[] => {
        if (!proofRequestData || !proof?.requestMessage?.indyProofRequest) {
          return []
        }

        const { retrievedCredentials, selected } = proofRequestData

        const requestedAttributes = formatRetrievedCredentials(
          retrievedCredentials,
          proof.requestMessage?.indyProofRequest
        )

        return requestedAttributes.attributes.map(
          (attr) => attr.requests[selected.attributes[attr.groupName] ?? 0].requestedAttributes
        )
      }
    ),
}

export { ProofRequestSelectors }
