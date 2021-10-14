import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

/**
 * every method returns true if permission is granted and false if it is denied
 * This abstracts A LOT of complexity, which might be good or background
 * (will edit this in the future, if complexity is required)
 */

export const requestPermissionsLocation = async () => {
  if (Platform.OS === 'android') {
    const status = await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION')
    return status === 'granted'
  }
  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('whenInUse')
    return status === 'granted'
  }
  return false
}
