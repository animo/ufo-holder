import { agentConfig, createAgent } from './config'
import { setupNotificationsHandler } from './modules'
import { initializeStore } from './store'
import { AppThunks } from './store/app'

// Create agent instance, initialize store
export const agent = createAgent(agentConfig)

// Add reset wallet option to dev menu
if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const { addWalletReset } = require('./utils/dev')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  addWalletReset(agent)
}

export const { store, persistor } = initializeStore(agent)

if (!store.getState().app.isFirstLaunch) {
  void store.dispatch(AppThunks.initializeAgent())
}

setupNotificationsHandler(agent, store)
