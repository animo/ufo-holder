import type { AsyncThunkOptions } from '../store.types'
import type { ConnectionRecord, Wallet } from '@aries-framework/core'
import type { Coordinate } from '@internal/components/Map'
import type { DeCustomPayload } from '@internal/modules'

import { EmergencyResponseModule } from '@animo/ufo-emergency-response'
import { PreciseLocationModule } from '@animo/ufo-precise-location'
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

import { AriesSelectors } from '../aries/aries.selectors'
import { AriesThunks } from '../aries/aries.thunks'
import { ProofRequestThunks } from '../aries/proofRequest/proofRequest.thunks'

import { getTravelTime } from '@internal/api'
import { config } from '@internal/config'
import { generateAgentKey, getAgentWalletKey, storeAgentWalletKey } from '@internal/modules/Keychain'

const AppThunks = {
  initializeAgent: createAsyncThunk<void, void, AsyncThunkOptions>(
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
        id: 'UFO-MOBILE-AGENT',
        key: walletKey,
      })

      await dispatch(AgentThunks.initializeAgent())

      void dispatch(ConnectionThunks.getAllConnections())
      void dispatch(CredentialsThunks.getAllCredentials())
      void dispatch(ProofsThunks.getAllProofs())
      void dispatch(MediationThunks.getAllMediationRecords())
    }
  ),

  newUser: createAsyncThunk<void, void, AsyncThunkOptions>('app/newUser', async (_, { dispatch }) => {
    await dispatch(AppThunks.initializeAgent())
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
        await dispatch(AriesThunks.createDispatchServiceConnection())
        await dispatch(AriesThunks.createIssuerConnection())
      }
    }
  ),

  handleNotification: createAsyncThunk<void, { payload: DeCustomPayload; coordinate: Coordinate }, AsyncThunkOptions>(
    'app/user/handleNotification',
    async (data, { extra: { agent }, getState, rejectWithValue, dispatch }) => {
      const origin = data.coordinate
      const { emergency, requiredSkills, location: destination } = data.payload

      const credentials = AriesSelectors.receivedCredentialsSelector(getState().aries)
      const connectionWithDispatch = AriesSelectors.dispatchServiceSelector(getState().aries)

      if (!connectionWithDispatch) {
        rejectWithValue('Could not establish a connection with the dispatch')
      }

      if (credentials.length < requiredSkills.length) {
        rejectWithValue(
          `Current credentials (${credentials.length}) is less than the required credentials (${requiredSkills.length})`
        )
      }

      const credentialDefinitionIds = credentials.map((credential) => credential.metadata.credentialDefinitionId)
      const hasRequiredCredentials = requiredSkills.every((skill) => credentialDefinitionIds.includes(skill))

      const travelTime = await getTravelTime(origin, destination)

      const erm = agent.injectionContainer.resolve(EmergencyResponseModule)
      void erm.sendEmergencyResponse((connectionWithDispatch as ConnectionRecord).id, {
        hasCredentials: hasRequiredCredentials,
        travelTime: hasRequiredCredentials ? travelTime : undefined,
      })

      void dispatch(AppThunks.emergency({ emergency: true }))
      void dispatch(
        AppThunks.storeEmergencyInfo({
          coordinate: destination,
          emergency: { travelTime, description: emergency.description, title: emergency.title },
        })
      )
    }
  ),

  pingPreciseLocation: createAsyncThunk<void, { connectionId: string; coordinate: Coordinate }, AsyncThunkOptions>(
    'app/user/pingPreciseLocation',
    (data, { extra: { agent } }) => {
      const plm = agent.injectionContainer.resolve(PreciseLocationModule)
      void plm.sendPreciseLocation(data.connectionId, data.coordinate)
    }
  ),

  emergency: createAsyncThunk<boolean, { emergency: boolean }, AsyncThunkOptions>(
    'app/user/emergency',
    ({ emergency }) => emergency
  ),

  deviceToken: createAsyncThunk<string, { deviceToken: string }, AsyncThunkOptions>(
    'app/user/deviceToken',
    ({ deviceToken }) => deviceToken
  ),

  denyEmergency: createAsyncThunk<void, { id: string }, AsyncThunkOptions>(
    'app/user/denyEmergency',
    async (data, { dispatch }) => {
      await dispatch(ProofsThunks.deleteProof(data.id))
      await dispatch(AppThunks.emergency({ emergency: false }))
    }
  ),

  acceptEmergency: createAsyncThunk<void, { id: string }, AsyncThunkOptions>(
    'app/user/acceptEmergency',
    async (data, { dispatch }) => {
      await dispatch(ProofRequestThunks.acceptRequest({ proofRecordId: data.id }))
      await dispatch(AppThunks.emergency({ emergency: false }))
    }
  ),

  storeEmergencyInfo: createAsyncThunk<
    { coordinate: Coordinate; emergency: { description: string; title: string; travelTime: number } },
    { coordinate: Coordinate; emergency: { description: string; title: string; travelTime: number } },
    AsyncThunkOptions
  >('app/user/storeEmergencyInfo', ({ coordinate, emergency }) => {
    return {
      coordinate,
      emergency,
    }
  }),
}

export { AppThunks }
