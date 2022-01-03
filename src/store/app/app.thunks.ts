import type { AsyncThunkOptions } from '../store.types'
import type { Wallet } from '@aries-framework/core'
import type { Emergency } from '@internal/components/EmergencyBottomSheet'
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
import { GeoThunks } from '../geo'

// eslint-disable-next-line import/no-cycle
import { AppActions } from './app.reducer'
import { AppSelectors } from './app.selectors'

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
    async (_, { extra: { agent }, dispatch, getState }) => {
      // Setup mediation
      const mediator = await agent.mediationRecipient.provision(config.mediatorInvitationUrl)

      // Start message pickup
      if (mediator) {
        await agent.mediationRecipient.initiateMessagePickup(mediator)
        await dispatch(AriesThunks.createDispatchServiceConnection())
        await dispatch(AriesThunks.createIssuerConnection())
      }

      // Get the connection with the dispatch
      const connectionWithDispatch = AriesSelectors.dispatchServiceSelector(getState().aries)

      // Check if the connection is active
      const hasActiveConnectionWithDispatch = connectionWithDispatch
        ? await agent.connections.returnWhenIsConnected(connectionWithDispatch.id)
        : false

      // Setup the taskmanager if the connection is active
      if (hasActiveConnectionWithDispatch) {
        await dispatch(GeoThunks.setupTaskManagers())
      }
    }
  ),

  handleNotification: createAsyncThunk<void, { payload: DeCustomPayload; coordinate: Coordinate }, AsyncThunkOptions>(
    'app/user/handleNotification',
    async (data, { getState, rejectWithValue, dispatch }) => {
      const origin = data.coordinate
      const { emergency, requiredSkills, location: destination } = data.payload

      const credentials = AriesSelectors.receivedCredentialsSelector(getState().aries)
      const connectionWithDispatch = AriesSelectors.dispatchServiceSelector(getState().aries)
      const travelMode = AppSelectors.travelMode({ app: getState().app })

      if (!connectionWithDispatch) {
        return rejectWithValue('Could not establish a connection with the dispatch')
      }

      if (credentials.length < requiredSkills.length) {
        return rejectWithValue(
          `Current credentials (${credentials.length}) is less than the required credentials (${requiredSkills.length})`
        )
      }

      const credentialDefinitionIds = credentials.map(
        (credential) =>
          credential.metadata.get<Record<'credentialDefinitionId', string>>('_internal/indyCredential')
            ?.credentialDefinitionId
      )

      // Check if the agent has the required credentials
      const hasRequiredCredentials = requiredSkills.every((skill) => credentialDefinitionIds.includes(skill))

      // Calculate the traveltime.
      // returns undefined if the time could not be calculated
      const travelTime = await getTravelTime(origin, destination, travelMode)

      if (hasRequiredCredentials) {
        // Respond that we can potentially help
        void dispatch(
          AppThunks.acceptPotentialEmergency({
            connectionId: connectionWithDispatch.id,
            emergency: { travelTime, ...emergency },
            coordinate: destination,
          })
        )
      } else {
        // respond that we cannot help
        void dispatch(AppThunks.rejectPotentialEmergency({ connectionId: connectionWithDispatch.id }))
      }
    }
  ),

  pingPreciseLocation: createAsyncThunk<void, { connectionId: string; coordinate: Coordinate }, AsyncThunkOptions>(
    'app/user/pingPreciseLocation',
    (data, { extra: { agent } }) => {
      const plm = agent.injectionContainer.resolve(PreciseLocationModule)
      void plm.sendPreciseLocation(data.connectionId, data.coordinate)
    }
  ),

  sendArrived: createAsyncThunk<void, { connectionId: string }, AsyncThunkOptions>(
    'app/user/sendArrived',
    ({ connectionId }, { extra: { agent } }) => {
      const erm = agent.injectionContainer.resolve(EmergencyResponseModule)
      void erm.arrived(connectionId)
    }
  ),

  rejectPotentialEmergency: createAsyncThunk<void, { connectionId: string }, AsyncThunkOptions>(
    'app/user/rejectPotentialEmergency',
    async ({ connectionId }, { dispatch, extra: { agent } }) => {
      const erm = agent.injectionContainer.resolve(EmergencyResponseModule)
      await erm.reject(connectionId)
      dispatch(AppActions.setHasPotentialEmergency({ hasPotentialEmergency: false }))
    }
  ),

  acceptPotentialEmergency: createAsyncThunk<
    void,
    { connectionId: string; emergency: Emergency; coordinate: Coordinate },
    AsyncThunkOptions
  >(
    'app/user/acceptPotentialEmergency',
    async ({ connectionId, emergency, coordinate }, { dispatch, extra: { agent } }) => {
      const erm = agent.injectionContainer.resolve(EmergencyResponseModule)
      await erm.accept(connectionId, { travelTime: emergency.travelTime })
      dispatch(AppActions.setHasPotentialEmergency({ hasPotentialEmergency: false }))
      void dispatch(
        AppActions.setEmergencyInfo({
          coordinate,
          emergency,
        })
      )
    }
  ),

  rejectEmergency: createAsyncThunk<void, { connectionId: string; proofId: string }, AsyncThunkOptions>(
    'app/user/rejectEmergency',
    async ({ connectionId, proofId }, { dispatch }) => {
      await dispatch(ProofsThunks.deleteProof(proofId))
      await dispatch(AppThunks.rejectPotentialEmergency({ connectionId }))
      dispatch(AppActions.setHasEmergency({ hasEmergency: false }))
    }
  ),

  acceptEmergency: createAsyncThunk<void, { proofId: string }, AsyncThunkOptions>(
    'app/user/acceptEmergency',
    async ({ proofId }, { dispatch }) => {
      await dispatch(ProofRequestThunks.acceptRequest({ proofRecordId: proofId }))
      dispatch(AppActions.setHasEmergency({ hasEmergency: true }))
    }
  ),
}

export { AppThunks }
