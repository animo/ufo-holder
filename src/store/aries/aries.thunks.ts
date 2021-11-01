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
      'http://agent.ufo.development.animo.id:8001?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiMGQyMjg5YTctMWUzMS00OTE2LWE2YzktY2NjMjZkMmRkM2I1IiwgInJlY2lwaWVudEtleXMiOiBbIjJ0OHhGMm5zeVhNRmc4dFF0NW45VWdEYzFaajNGQXZtYWsxbUxVdjVjRFNzIl0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2FnZW50LnVmby5kZXZlbG9wbWVudC5hbmltby5pZDo4MDAxIiwgImxhYmVsIjogIkFuaW1vIFVGTyBEZXZlbG9wbWVudCBBZ2VudCJ9'

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
