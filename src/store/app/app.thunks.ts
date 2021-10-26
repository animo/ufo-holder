import type { AsyncThunkOptions } from '../store.types'
import type { Wallet } from '@aries-framework/core'

import { InjectionSymbols } from '@aries-framework/core'
import {
  AgentThunks,
  ConnectionThunks,
  CredentialsThunks,
  MediationThunks,
  ProofsThunks,
} from '@aries-framework/redux-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { AriesThunks } from '../aries'

import { config } from '@internal/config'
import { generateAgentKey, getAgentWalletKey, storeAgentWalletKey } from '@internal/modules/Keychain'

const AppThunks = {
  initializeAgent: createAsyncThunk<void, { name: string }, AsyncThunkOptions>(
    'app/initializeAgent',
    async (_, { dispatch, extra: { agent } }) => {
      let walletKey: string | false

      walletKey = await getAgentWalletKey()

      if (!walletKey) {
        walletKey = generateAgentKey()
        await storeAgentWalletKey(walletKey)
      }

      await AsyncStorage.setItem('hasWalletKey', 'true')

      // Manually set up wallet with wallet key from key chain
      const wallet = agent.injectionContainer.resolve<Wallet>(InjectionSymbols.Wallet)
      await wallet.initialize({
        // TODO: should this be name?
        id: 'UFO-MOBILE-AGENT',
        key: walletKey,
      })

      // TODO: set the name here on the agent. pr will be created for this in afj

      await dispatch(AgentThunks.initializeAgent())

      void dispatch(ConnectionThunks.getAllConnections())
      void dispatch(CredentialsThunks.getAllCredentials())
      void dispatch(ProofsThunks.getAllProofs())
      void dispatch(MediationThunks.getAllMediationRecords())
    }
  ),

  newUser: createAsyncThunk<void, { name: string }, AsyncThunkOptions>('app/newUser', async (data, { dispatch }) => {
    await dispatch(AppThunks.initializeAgent(data))
    await dispatch(AppThunks.agentSetup())
  }),

  agentSetup: createAsyncThunk<void, void, AsyncThunkOptions>(
    'app/user/agentSetup',
    async (_, { extra: { agent }, dispatch }) => {
      // Setup mediation
      const mediator = await agent.mediationRecipient.provision(config.mediatorInvitationUrl)

      // Start message pickup
      if (mediator) {
        await agent.mediationRecipient.initiateMessagePickup(mediator)
        // TODO: get dispatch and issuer connection
        await dispatch(AriesThunks.createIssuerConnection())
        // await dispatch(AriesThunks.createDispatchConnection())
      }
    }
  ),

  emergency: createAsyncThunk<boolean, { emergency: boolean }, AsyncThunkOptions>(
    'app/user/emergency',
    ({ emergency }) => emergency
  ),
}

export { AppThunks }
