import type { RootState } from '../index'
import type { ConnectionRecord, CredentialRecord, ProofRecord } from '@aries-framework/core'

import { ConnectionState, CredentialState, ProofState } from '@aries-framework/core'
import {
  ConnectionsSelectors,
  ProofsSelectors,
  CredentialsSelectors,
  MediationSelectors,
} from '@aries-framework/redux-store'
import { createSelector } from '@reduxjs/toolkit'

const receivedCredentialsSelector = createSelector(CredentialsSelectors.credentialRecordsSelector, (credentials) =>
  credentials.filter((c) => [CredentialState.CredentialReceived, CredentialState.Done].includes(c.state))
)

const credentialsSelector = createSelector(CredentialsSelectors.credentialRecordsSelector, (credentials) =>
  credentials.sort((a, b) => {
    if (a.state === CredentialState.OfferReceived) {
      return -1
    } else if (a.state === b.state) {
      return 0
    } else {
      return 1
    }
  })
)

const readyConnectionsSelector = createSelector(ConnectionsSelectors.connectionRecordsSelector, (connections) =>
  connections.filter((c) => [ConnectionState.Responded, ConnectionState.Complete].includes(c.state))
)

const visibleConnectionsSelector = createSelector(
  [readyConnectionsSelector, MediationSelectors.mediationRecordsSelector],
  (connections, mediators) => {
    if (__DEV__) {
      return connections
    }

    const mediationConnectionIds = mediators.map((m) => m.connectionId)
    return connections.filter((c) => !mediationConnectionIds.includes(c.id))
  }
)

const sharedProofsSelector = createSelector(ProofsSelectors.proofRecordsSelector, (proofs) =>
  proofs.filter((p) => [ProofState.Done, ProofState.PresentationSent].includes(p.state))
)

const credentialWithConnectionByIdSelector =
  (credentialId: string) =>
  (
    state: RootState['aries']
  ): { credential: CredentialRecord | undefined; connection: ConnectionRecord | undefined | null } => {
    const credential = CredentialsSelectors.credentialRecordByIdSelector(credentialId)(state)

    return {
      credential,
      connection: credential?.connectionId
        ? ConnectionsSelectors.connectionRecordByIdSelector(credential.connectionId)(state)
        : null,
    }
  }

const proofWithConnectionByIdSelector =
  (proofId: string) =>
  (state: RootState['aries']): { proof: ProofRecord | undefined; connection: ConnectionRecord | undefined | null } => {
    const proof = ProofsSelectors.proofRecordByIdSelector(proofId)(state)

    return {
      proof,
      connection: proof?.connectionId
        ? ConnectionsSelectors.connectionRecordByIdSelector(proof.connectionId)(state)
        : null,
    }
  }

const credentialsWithConnectionSelector = (state: RootState['aries']) => {
  const credentials = credentialsSelector(state)

  return credentials.map((credential) => ({
    credential,
    connection: credential.connectionId
      ? ConnectionsSelectors.connectionRecordByIdSelector(credential.connectionId)(state)
      : null,
  }))
}

const actionRecordsSelector = createSelector(
  [
    ProofsSelectors.proofRecordsByStateSelector(ProofState.RequestReceived),
    CredentialsSelectors.credentialsRecordsByStateSelector(CredentialState.OfferReceived),
  ],
  (proofs, credentials) => [...proofs, ...credentials]
)

const AriesSelectors = {
  actionRecordsSelector,
  receivedCredentialsSelector,
  readyConnectionsSelector,
  sharedProofsSelector,
  credentialsWithConnectionSelector,
  credentialWithConnectionByIdSelector,
  proofWithConnectionByIdSelector,
  visibleConnectionsSelector,
}

export { AriesSelectors }
