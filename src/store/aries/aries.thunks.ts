import type { AsyncThunkOptions } from '@internal/store/store.types'

import { ConnectionRepository } from '@aries-framework/core'
import { DevicePlatform, PushNotificationsModule } from '@aries-framework/push-notifications'
import { connectionsSlice, ConnectionThunks } from '@aries-framework/redux-store'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { AppSelectors } from '../app/app.selectors'

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

  createDispatchServiceConnection: createAsyncThunk<
    {
      dispatchServiceConnectionId: string
    },
    void,
    AsyncThunkOptions
  >('aries/createDispatchServiceConnection', async (_, { dispatch, extra: { agent }, getState }) => {
    const invitationUrl =
      'http://dispatch-service.ufo.development.animo.id:8081?c_i=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvY29ubmVjdGlvbnMvMS4wL2ludml0YXRpb24iLCJAaWQiOiJiMzAzZjcyMS01MWIzLTQxMWUtOTgwMS1hZGJmZTg2NmI2ZDYiLCJsYWJlbCI6ImRpc3BhdGNoLXNlcnZpY2UiLCJyZWNpcGllbnRLZXlzIjpbIkdOWkZYQlVYRmozZFFKRWFjQm9tRWExN0djQVEyQjVuWXBGOHVXbnduYjdrIl0sInNlcnZpY2VFbmRwb2ludCI6Imh0dHA6Ly9kaXNwYXRjaC1zZXJ2aWNlLnVmby5kZXZlbG9wbWVudC5hbmltby5pZDo4MDgxIiwicm91dGluZ0tleXMiOltdfQ'

    let connection = await dispatch(
      ConnectionThunks.receiveInvitationFromUrl({
        invitationUrl,
      })
    ).unwrap()

    connection = await agent.connections.returnWhenIsConnected(connection.id)

    const deviceToken = AppSelectors.deviceTokenSelector(getState())

    if (deviceToken) {
      const pns = agent.injectionContainer.resolve(PushNotificationsModule)
      await pns.setDeviceInfo(connection.id, { deviceToken, devicePlatform: DevicePlatform.Android })
    }

    return {
      dispatchServiceConnectionId: connection.id,
    }
  }),

  createIssuerConnection: createAsyncThunk<void, void, AsyncThunkOptions>(
    'aries/createIssuerConnection',
    async (_, { dispatch, extra: { agent } }) => {
      const invitationUrl =
        'http://agent.community.animo.id:8001?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiNDM1ODJhOTgtYWM5ZS00YjVhLWE5ZmUtOTJhYTg5OWY4MjU2IiwgInJlY2lwaWVudEtleXMiOiBbInNYVWNpY1ZtaUZSU1hQMThTSnVzQ1JpdmZ2cWJ6WFlFQ2NZRnV2OWpmMUsiXSwgImxhYmVsIjogIkFuaW1vIENvbW11bml0eSBBZ2VudCIsICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2FnZW50LmNvbW11bml0eS5hbmltby5pZDo4MDAxIn0='

      const connection = await dispatch(
        ConnectionThunks.receiveInvitationFromUrl({
          invitationUrl,
        })
      ).unwrap()

      await agent.connections.returnWhenIsConnected(connection.id)
    }
  ),

  updateAgentName: createAsyncThunk<
    void,
    {
      name: string
    },
    AsyncThunkOptions
  >('aries/agent/updateName', (data, { extra: { agent } }) => {
    agent.config.label = data.name
  }),
}

export { AriesThunks }
