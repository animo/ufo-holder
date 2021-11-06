/* eslint-disable no-console */
import type { Coordinate } from '@internal/components/Map'
import type { Store } from '@internal/store/store.types'
import type { ReceivedNotification } from 'react-native-push-notification'

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import Geolocation from 'react-native-geolocation-service'
import { default as PushNotification, Importance } from 'react-native-push-notification'

import { AppThunks } from '@internal/store/app'
import { requestPlatform } from '@internal/utils'

export type DeCustomPayload = {
  location: Coordinate
  requiredSkills: string[]
  emergency: Emergency
}

type Emergency = {
  description: string
  title: string
}

// This is called when a silent notification is received
const onNotification = (notification: Omit<ReceivedNotification, 'userInfo'>, store: Store) => {
  const data = notification.data
  let parsedData: DeCustomPayload

  if (requestPlatform() === 'android') {
    parsedData = {
      location: JSON.parse(data.location) as Coordinate,
      requiredSkills: JSON.parse(data.requiredSkills) as string[],
      emergency: JSON.parse(data.emergency) as Emergency,
    }
  } else {
    parsedData = data as DeCustomPayload
  }

  Geolocation.getCurrentPosition(
    (position) => {
      void store.dispatch(AppThunks.handleNotification({ payload: parsedData, coordinate: position.coords }))
    },
    (error) => console.error(error)
  )
}

const onRegister = ({ token }: { os: string; token: string }, store: Store) => {
  console.log('TOKEN: ' + token)
  void store.dispatch(AppThunks.deviceToken({ deviceToken: token }))
}

const onRegistrationError = (err: Error) => console.error(err)

export const setupNotificationsHandler = (store: Store) => {
  PushNotification.configure({
    onRegister: (token) => onRegister(token, store),
    onNotification: (notification) => onNotification(notification, store),
    onRegistrationError,
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
  })

  if (requestPlatform() === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'emergency',
        channelName: 'Emergencies',
        vibrate: true,
        importance: Importance.HIGH,
        channelDescription: 'Demo channel to receive information about emergencies',
        playSound: true,
      },
      // required callback for channel created...
      (x) => x
    )
  }

  if (requestPlatform() === 'ios') {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'emergency',
        actions: [
          {
            id: '0',
            title: 'Emergency',
            options: { foreground: false },
          },
        ],
      },
    ])
  }
}
