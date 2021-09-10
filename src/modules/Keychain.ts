import * as Keychain from 'react-native-keychain'

/**
 * Store the agent key securely in the key chain
 *
 * @param key the key to store
 * @todo error handling
 * @todo check all options and see which we want to specify
 * @todo what if FaceID is declined. Can we fall back to pass code? How can we manage this?
 */
export const storeAgentWalletKey = (key: string) => {
  return Keychain.setGenericPassword('MOBILE-AGENT-REACT-NATIVE', key, {
    service: 'MOBILE-AGENT-REACT-NATIVE',
  })
}

/**
 * Generate 32 byte agent key crypto getRandomValues.
 *
 * @returns The agent key
 *
 * @see https://github.com/LinusU/react-native-get-random-values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 */
export const generateAgentKey = (): string => crypto.getRandomValues(new Uint8Array(32)).join('')

/**
 * Get the agent wallet key from the key chain
 *
 * @returns The wallet key or false if not found
 */
export const getAgentWalletKey = async (): Promise<string | false> => {
  const walletKey = await Keychain.getGenericPassword({
    service: 'MOBILE-AGENT-REACT-NATIVE',
  })
  return walletKey ? walletKey.password : false
}

export const resetAgentWalletKey = () => Keychain.resetGenericPassword({ service: 'MOBILE-AGENT-REACT-NATIVE' })
