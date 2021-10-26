import type { AsyncThunkOptions } from '@internal/store/store.types'

import { ConnectionRepository } from '@aries-framework/core'
import { connectionsSlice, ConnectionThunks } from '@aries-framework/redux-store'
import { createAsyncThunk } from '@reduxjs/toolkit'

const AriesThunks = {
  updateConnectionAlias: createAsyncThunk<void, { connectionId: string; alias?: string }, AsyncThunkOptions>(
    'aries/updateConnectionAlias',
    async ({ connectionId, alias }, { dispatch, extra: { agent } }) => {
      const connectionRepository = agent.injectionContainer.resolve(ConnectionRepository)
      const connectionRecord = await connectionRepository.getById(connectionId)
      connectionRecord.alias = alias
      await connectionRepository.update(connectionRecord)
      dispatch(connectionsSlice.actions.updateOrAdd(connectionRecord))
    }
  ),

  createDispatchConnection: createAsyncThunk<
    {
      dispatchConnectionId: string
    },
    void,
    AsyncThunkOptions
  >('aries/createDispatchConnection', async (_, { dispatch, extra: { agent } }) => {
    const invitationUrl = ''

    let connection = await dispatch(
      ConnectionThunks.receiveInvitationFromUrl({
        invitationUrl,
      })
    ).unwrap()

    connection = await agent.connections.returnWhenIsConnected(connection.id)

    return {
      dispatchConnectionId: connection.id,
    }
  }),

  createIssuerConnection: createAsyncThunk<
    {
      issuerConnectionId: string
    },
    void,
    AsyncThunkOptions
  >('aries/createIssuerConnection', async (_, { dispatch, extra: { agent } }) => {
    const invitationUrl =
      'http://agent.community.animo.id:8001?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiOGQ4NDA3MWItYzE4Zi00MzgwLTg1NTgtMzIxYTFlYWY5NWY0IiwgInNlcnZpY2VFbmRwb2ludCI6ICJodHRwOi8vYWdlbnQuY29tbXVuaXR5LmFuaW1vLmlkOjgwMDEiLCAibGFiZWwiOiAiQW5pbW8gQ29tbXVuaXR5IEFnZW50IiwgInJlY2lwaWVudEtleXMiOiBbIkZkVDFaMnZoS2Q4QzduWnVBYVY5QnhVTnNqd0Z4OHVvWEo3QkR4eTFEOEVMIl19'

    let connection = await dispatch(
      ConnectionThunks.receiveInvitationFromUrl({
        invitationUrl,
      })
    ).unwrap()

    connection = await agent.connections.returnWhenIsConnected(connection.id)

    return {
      issuerConnectionId: connection.id,
    }
  }),
}

export { AriesThunks }
