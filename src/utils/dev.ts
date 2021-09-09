import type { Agent, Wallet } from '@aries-framework/core'

import { InjectionSymbols } from '@aries-framework/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DevSettings } from 'react-native'

import { resetAgentWalletKey } from '@internal/modules/Keychain'

export function addWalletReset(agent: Agent) {
  DevSettings.addMenuItem('Reset Wallet', async () => {
    const wallet = agent.injectionContainer.resolve<Wallet>(InjectionSymbols.Wallet)

    if (!agent.isInitialized) {
      // eslint-disable-next-line no-console
      console.error('Agent must be initialized to reset wallet')
    }

    await wallet.delete()
    await AsyncStorage.clear()
    await resetAgentWalletKey()
    DevSettings.reload('Wallet removed')
  })
}
