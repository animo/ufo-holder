import type { AsyncThunkOptions } from '@internal/store/store.types'

import { ConnectionRepository } from '@aries-framework/core'
import { DevicePlatform, PushNotificationsModule } from '@aries-framework/push-notifications'
import { connectionsSlice, ConnectionThunks } from '@aries-framework/redux-store'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { AppSelectors } from '../app/app.selectors'

import { config } from '@internal/config'

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
    let connection = await dispatch(
      ConnectionThunks.receiveInvitationFromUrl({ invitationUrl: config.dispatchInvitationUrl })
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
      const connection = await dispatch(
        ConnectionThunks.receiveInvitationFromUrl({
          invitationUrl: config.issuerInvitationUrl,
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
