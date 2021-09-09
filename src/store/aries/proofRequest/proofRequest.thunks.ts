import type { RetrievedCredentials } from '@aries-framework/core'
import type { AsyncThunkOptions } from '@internal/store/store.types'

import { ProofsSelectors, ProofsThunks } from '@aries-framework/redux-store'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ProofRequestSelectors } from './proofRequest.selectors'

import { toRequestedCredentials } from '@internal/utils'

const ProofRequestThunks = {
  getCredentialOptionsForProofRequest: createAsyncThunk<
    { proofRecordId: string; retrievedCredentials: RetrievedCredentials },
    { proofRecordId: string },
    AsyncThunkOptions
  >('aries/getCredentialForRequest', async ({ proofRecordId }, { dispatch, getState, rejectWithValue }) => {
    const proof = ProofsSelectors.proofRecordByIdSelector(proofRecordId)(getState().aries)
    const proofRequest = proof?.requestMessage?.indyProofRequest

    if (!proofRequest) {
      return rejectWithValue('Unable to retrieve credentials, proof not found')
    }

    const retrievedCredentials = await dispatch(
      ProofsThunks.getRequestedCredentialsForProofRequest({
        proofRequest,
        presentationProposal: proof?.proposalMessage?.presentationProposal,
      })
    ).unwrap()

    return { proofRecordId, retrievedCredentials }
  }),

  acceptRequest: createAsyncThunk<void, { proofRecordId: string }, AsyncThunkOptions>(
    'aries/acceptProofRequest',
    async ({ proofRecordId }, { dispatch, getState, rejectWithValue }) => {
      const proofRequestData = ProofRequestSelectors.proofRequestDataSelector(proofRecordId)(getState())

      if (!proofRequestData) {
        return rejectWithValue('Unable to accept request, retrieved credentials not found')
      }

      const requestedCredentials = toRequestedCredentials(proofRequestData)
      await dispatch(ProofsThunks.acceptRequest({ proofRecordId, requestedCredentials })).unwrap()
    }
  ),

  declineRequest: createAsyncThunk<void, { proofRecordId: string }, AsyncThunkOptions>(
    'aries/declineRequest',
    async ({ proofRecordId }, { dispatch }) => {
      await dispatch(ProofsThunks.deleteProof(proofRecordId)).unwrap()
    }
  ),
}

export { ProofRequestThunks }
