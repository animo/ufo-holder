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
    const invitationUrl =
      'https://didcomm.faber.agent.animo.id?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiNzVmMDg1ZmEtYTJkZS00ZWU2LTlhODQtMTBhNzQwNzI2NTViIiwgInNlcnZpY2VFbmRwb2ludCI6ICJodHRwczovL2RpZGNvbW0uZmFiZXIuYWdlbnQuYW5pbW8uaWQiLCAibGFiZWwiOiAia2xhYXMiLCAicmVjaXBpZW50S2V5cyI6IFsiSDc5OWFYa2lrWUZ1NkNtTHFhY1oxeTRUZGk4TnhOWEVQeE1TR2tYdmNrYjYiXX0='

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
    const invitationUrl = ''

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
