import {
  agentSlice,
  connectionsSlice,
  proofsSlice,
  credentialsSlice,
  mediationSlice,
} from '@aries-framework/redux-store'
import { combineReducers } from 'redux'

import { AriesSelectors } from './aries.selectors'
import { AriesThunks } from './aries.thunks'
import { ProofRequestReducer } from './proofRequest/proofRequest.reducer'

const AriesReducer = combineReducers({
  agent: agentSlice.reducer,
  connections: connectionsSlice.reducer,
  proofs: proofsSlice.reducer,
  credentials: credentialsSlice.reducer,
  mediation: mediationSlice.reducer,
  proofRequests: ProofRequestReducer,
})

export { AriesReducer, AriesThunks, AriesSelectors }
