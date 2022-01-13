/* eslint-disable no-console */
import type { Coordinate } from '@internal/components/Map'
import type { Store } from '@internal/store/store.types'
import type { H3Resolution } from '@internal/utils'
import type { ReceivedNotification } from 'react-native-push-notification'

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Alert } from 'react-native'
import Geocoder from 'react-native-geocoding'
import Geolocation from 'react-native-geolocation-service'
import { default as PushNotification, Importance } from 'react-native-push-notification'

import { navigate } from '@internal/navigation'
import { AppThunks } from '@internal/store/app'
import { AppActions } from '@internal/store/app/app.reducer'
import { GeoActions } from '@internal/store/geo'
import { requestPlatform } from '@internal/utils'

export type DeCustomPayload = {
  location: Coordinate
  emergency: Emergency
}

export type Emergency = {
  // definitie
  title: string
  // toelichting
  definition: string
  address?: string
  travelTime?: number
}

// This is called when a silent notification is received
const onNotification = async (notification: Omit<ReceivedNotification, 'userInfo'>, store: Store) => {
  const data = notification.data

  // handle incoming potential emergency
  if (data.emergency) {
    const location = JSON.parse(data.location) as Coordinate
    const parsedEmergency = JSON.parse(data.emergency) as { title?: string; definition?: string }
    const address = (await Geocoder.from(location)).results[0].formatted_address

    const emergency: Emergency = {
      title: parsedEmergency.title ?? 'Voor de pilot hebben wij geen titel kunnen vinden',
      definition: parsedEmergency.definition ?? 'Voor de pilot hebben wij geen toelichting kunnen vinden',
      address,
    }

    const parsedData = {
      location,
      emergency,
    }

    Geolocation.getCurrentPosition(
      (position) => {
        void store.dispatch(AppThunks.handleNotification({ payload: parsedData, coordinate: position.coords }))
      },
      (error) => console.error(error),
      { timeout: 10000 }
    )
  }
  console.log(data)

  // handle updating of the resolution
  if (data.resolution) {
    const resolution = data.resolution as H3Resolution
    store.dispatch(GeoActions.setResolution({ resolution }))
  }

  // handle done call from the emergency
  if (data.done) {
    store.dispatch(AppActions.setFinishedEmergency())
    Alert.alert('De dispatch heeft aangegeven dat het is opgelost. U kunt weer verder')
    navigate('CredentialsScreen')
  }
}

const onRegister = ({ token }: { os: string; token: string }, store: Store) => {
  void store.dispatch(AppActions.setDeviceToken({ deviceToken: token }))
}

const onRegistrationError = (err: Error) => console.error(err)

export const setupNotificationsHandler = (store: Store) => {
  PushNotification.configure({
    onRegister: (token) => onRegister(token, store),
    onNotification: async (notification) => await onNotification(notification, store),
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
