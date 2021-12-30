import type { RetrievedCredentials } from '@aries-framework/core'
import type { AsyncThunkOptions } from '@internal/store/store.types'

import { ProofsSelectors, ProofsThunks } from '@aries-framework/redux-store'
import { createAsyncThunk } from '@reduxjs/toolkit'

const ProofRequestThunks = {
  getCredentialOptionsForProofRequest: createAsyncThunk<
    { proofRecordId: string; retrievedCredentials: RetrievedCredentials },
    { proofRecordId: string },
    AsyncThunkOptions
  >('aries/getCredentialForRequest', async ({ proofRecordId }, { dispatch, getState, rejectWithValue }) => {
    const proof = ProofsSelectors.proofRecordByIdSelector(proofRecordId)(getState().aries)

    if (!proof) return rejectWithValue('Unable to retrieve credentials, proof not found')

    const retrievedCredentials = await dispatch(
      ProofsThunks.getRequestedCredentialsForProofRequest({
        proofRequest: proof.id,
        presentationProposal: { filterByPresentationPreview: true },
      })
    ).unwrap()

    return { proofRecordId, retrievedCredentials }
  }),

  acceptRequest: createAsyncThunk<void, { proofRecordId: string }, AsyncThunkOptions>(
    'aries/acceptProofRequest',
    async ({ proofRecordId }, { dispatch, getState, rejectWithValue }) => {
      const proof = ProofsSelectors.proofRecordByIdSelector(proofRecordId)(getState().aries)
      const proofRequest = proof?.requestMessage?.indyProofRequest

      if (!proofRequest || !proof) return rejectWithValue('Unable to retrieve credentials, proof not found')

      const requestedCredentials = await dispatch(
        ProofsThunks.getRequestedCredentialsForProofRequest({
          proofRequest: proof.id,
          presentationProposal: { filterByPresentationPreview: true },
        })
      ).unwrap()
      const retrievedCredentials = await dispatch(
        ProofsThunks.autoSelectCredentialsForProofRequest(requestedCredentials)
      ).unwrap()

      await dispatch(ProofsThunks.acceptRequest({ proofRecordId, requestedCredentials: retrievedCredentials })).unwrap()
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
