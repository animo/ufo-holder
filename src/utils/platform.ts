import { Platform } from 'react-native'

export const requestPlatform = () => {
  const platform = Platform.OS
  if (platform !== 'ios' && platform !== 'android') {
    throw new Error('Invalid platform. Only iOS and Android are supported.')
  }
  return platform
}
