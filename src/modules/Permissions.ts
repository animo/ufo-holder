import type { PermissionStatus, Rationale } from 'react-native-permissions'

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { check, checkNotifications, openSettings, PERMISSIONS, request } from 'react-native-permissions'

import { requestPlatform } from '@internal/utils'

/**
 * 'granted':          Permission is granted and it can be used
 * 'not answered yet': Permissions can be requested (might already have tried a request before)
 *                     Could request again
 * 'blocked':          Permissions are unavailable or have been denied before
 *                     Handle this case by showing the `open settings` menu
 */
export type MappedPermissionStatus = 'granted' | 'not answered yet' | 'blocked'

export const AppPermissionsMap = {
  // iOS and Android
  location: { ios: PERMISSIONS.IOS.LOCATION_ALWAYS, android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION },
  // iOS only
  notifications: null,
}

const hasPermission = async (permission: keyof typeof AppPermissionsMap): Promise<MappedPermissionStatus> => {
  let permissionStatus: PermissionStatus
  // Notification specific handling
  if (permission === 'notifications') {
    permissionStatus = (await checkNotifications()).status
  } else {
    const platform = requestPlatform()

    const mappedPermission = AppPermissionsMap[permission][platform]
    permissionStatus = await check(mappedPermission)
  }

  switch (permissionStatus) {
    // The permission is granted
    case 'granted':
      return 'granted'
    // The permission has not been requested / is denied but requestable
    case 'denied':
      return 'not answered yet'
    // The permission is denied and not requestable anymore
    case 'blocked':
      return 'blocked'
    // The permission is granted but with limitations
    case 'limited':
      return 'blocked'
    // This feature is not available (on this device / in this context)
    case 'unavailable':
      return 'blocked'
  }
}

const requestPermission = async (permission: keyof typeof AppPermissionsMap, rationale?: Rationale) => {
  let permissionStatus: PermissionStatus = 'granted'

  if (permission === 'notifications') {
    if (requestPlatform() === 'ios') {
      await PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
        lockScreen: true,
        notificationCenter: true,
        authorizationStatus: 3,
      }).then(
        () => {
          permissionStatus = 'granted'
        },
        () => {
          permissionStatus = 'blocked'
        }
      )
    }
  } else {
    const platform = requestPlatform()
    const mappedPermission = AppPermissionsMap[permission][platform]

    permissionStatus = await request(mappedPermission, rationale)
  }

  switch (permissionStatus) {
    // The permission is granted
    case 'granted':
      return 'granted'
    // The permission has not been requested / is denied but requestable
    case 'denied':
      return 'not answered yet'
    // The permission is denied and not requestable anymore
    case 'blocked':
      return 'blocked'
    // The permission is granted but with limitations
    case 'limited':
      return 'blocked'
    // This feature is not available (on this device / in this context)
    case 'unavailable':
      return 'blocked'
  }
}

export { openSettings, hasPermission, requestPermission }
