import type { PermissionStatus, Rationale } from 'react-native-permissions'

import { Platform } from 'react-native'
import {
  check,
  checkNotifications,
  openSettings,
  PERMISSIONS,
  request,
  requestNotifications,
} from 'react-native-permissions'

export const AppPermissionsMap = {
  // iOS and Android
  location: { ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION },
  // iOS only
  notifications: { ios: null, android: null },
}

/*
 * @todo handle each case app specific
 */
const hasPermission = async (permission: keyof typeof AppPermissionsMap) => {
  let permissionStatus: PermissionStatus
  // Notification specific handling
  if (permission === 'notifications') {
    permissionStatus = (await checkNotifications()).status
  } else {
    // TODO: improve check

    const platform = Platform.OS === 'ios' ? 'ios' : 'android'
    const mappedPermission = AppPermissionsMap[permission][platform]
    permissionStatus = await check(mappedPermission)
  }

  switch (permissionStatus) {
    case 'granted':
      return true
    case 'denied':
      return false
    case 'blocked':
      return false
    case 'limited':
      return false
    case 'unavailable':
      return false
  }
}

/**
 * @todo handle each case app specific
 */
const requestPermission = async (permission: keyof typeof AppPermissionsMap, rationale?: Rationale) => {
  let permissionStatus: PermissionStatus

  if (permission === 'notifications') {
    permissionStatus = (await requestNotifications(['alert', 'sound'])).status
  } else {
    // TODO: improve check

    const platform = Platform.OS === 'ios' ? 'ios' : 'android'
    const mappedPermission = AppPermissionsMap[permission][platform]

    permissionStatus = await request(mappedPermission, rationale)
  }

  switch (permissionStatus) {
    case 'granted':
      return true
    case 'denied':
      return false
    case 'blocked':
      return false
    case 'limited':
      return false
    case 'unavailable':
      return false
  }
}

export { openSettings, hasPermission, requestPermission }
