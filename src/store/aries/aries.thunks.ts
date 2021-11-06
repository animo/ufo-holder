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
      'http://dispatch-service.ufo.development.animo.id:8081?c_i=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvY29ubmVjdGlvbnMvMS4wL2ludml0YXRpb24iLCJAaWQiOiIyNWFiNjEyMS0zY2FkLTQ5ODAtOGZlMS0xNGJiYjJkOGM4NTYiLCJsYWJlbCI6ImRpc3BhdGNoLXNlcnZpY2UiLCJyZWNpcGllbnRLZXlzIjpbIkZ2MVJxZU1NWWZCaUh4ZUZEU1l6cXVGc0JyRnpvQVpHZGRqNUdGQVdFNXB5Il0sInNlcnZpY2VFbmRwb2ludCI6Imh0dHA6Ly9kaXNwYXRjaC1zZXJ2aWNlLnVmby5kZXZlbG9wbWVudC5hbmltby5pZDo4MDgxIiwicm91dGluZ0tleXMiOltdfQ'

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
