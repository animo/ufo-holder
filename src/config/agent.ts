import type { InitConfig } from '@aries-framework/core'

import {
  MediatorPickupStrategy,
  WsOutboundTransport,
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConsoleLogger,
  HttpOutboundTransport,
  LogLevel,
} from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'

import { indyLedgers } from '@internal/utils'

export const agentConfig: InitConfig = {
  label: 'UFO-HOLDER',
  logger: new ConsoleLogger(LogLevel.test),
  indyLedgers,
  autoAcceptConnections: true,
  autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
  autoAcceptProofs: AutoAcceptProof.ContentApproved,

  // ACA-Py mediation uses implicit pickup
  mediatorPickupStrategy: MediatorPickupStrategy.Implicit,
}

export function createAgent(config: InitConfig) {
  const agent = new Agent(config, agentDependencies)
  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  return agent
}
