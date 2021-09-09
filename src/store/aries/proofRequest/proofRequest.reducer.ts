import type { RetrievedCredentials } from '@aries-framework/core'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ProofsThunks } from '@aries-framework/redux-store'
import { createSlice } from '@reduxjs/toolkit'

import { ProofRequestSelectors } from './proofRequest.selectors'
import { ProofRequestThunks } from './proofRequest.thunks'

export interface ProofRequestState {
  [proofRecordId: string]: ProofRequestData | undefined
}

export interface ProofRequestData {
  selected: {
    attributes: {
      [groupName: string]: number | undefined
    }
    predicates: {
      [groupName: string]: number | undefined
    }
  }
  retrievedCredentials: RetrievedCredentials
}

const initialState: ProofRequestState = {}

const proofRequestSlice = createSlice({
  name: 'proofRequest',
  initialState,
  reducers: {
    setSelectedAttributeForGroup(
      state,
      { payload }: PayloadAction<{ proofRecordId: string; groupName: string; selectedIndex: number }>
    ) {
      const proofRequestData = state[payload.proofRecordId]

      if (!proofRequestData) {
        return state
        // do something (set error in state)
      }

      proofRequestData.selected.attributes[payload.groupName] = payload.selectedIndex
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ProofRequestThunks.getCredentialOptionsForProofRequest.fulfilled, (state, action) => {
      state[action.payload.proofRecordId] = {
        retrievedCredentials: action.payload.retrievedCredentials,
        selected: {
          attributes: {},
          predicates: {},
        },
      }
    })
    // TODO: add loading state
    builder.addCase(ProofRequestThunks.acceptRequest.fulfilled, (state, action) => {
      state[action.meta.arg.proofRecordId] = undefined
    })
    // Make sure we remove the entry when a proof is deleted
    builder.addCase(ProofsThunks.deleteProof.fulfilled, (state, action) => {
      state[action.meta.arg] = undefined
    })
  },
})

const { reducer, actions } = proofRequestSlice
export { actions as ProofRequestActions, reducer as ProofRequestReducer, ProofRequestThunks, ProofRequestSelectors }
