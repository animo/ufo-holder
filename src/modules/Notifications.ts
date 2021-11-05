/* eslint-disable no-console */
import type { Agent } from '@aries-framework/core'
import type { Coordinate } from '@internal/components/Map'
import type { ReceivedNotification } from 'react-native-push-notification'

import { EmergencyResponseModule } from '@animo/ufo-emergency-response'
import { CredentialState } from '@aries-framework/core'
import { DevicePlatform, PushNotificationsModule } from '@aries-framework/push-notifications'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import Geolocation from 'react-native-geolocation-service'
// eslint-disable-next-line import/no-named-as-default
import PushNotification, { Importance } from 'react-native-push-notification'

import { getTravelTime, sendResponseToSilentnotification } from '@internal/api'
import { AppThunks } from '@internal/store/app'
import { credentialRecordToListItem, requestPlatform } from '@internal/utils'

type DeCustomPayload = {
  location: Coordinate
  requiredSkills: string[]
  emergency: Emergency
}

type Emergency = {
  description: string
  title: string
}

// This is called when a silent notification is received
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onNotification = (notification: Omit<ReceivedNotification, 'userInfo'>, agent: Agent, store: any) => {
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
      const run = async () => {
        const travelTime = await getTravelTime(position.coords, parsedData.location)

        const credentials = await agent.credentials.getAll()
        const connection = (await agent.connections.getAll()).find((conn) => conn.theirLabel === 'dispatch-service')

        const credentialDefinitionIds = credentials
          .filter(
            (credential) =>
              credential.state === CredentialState.Done || credential.state === CredentialState.CredentialReceived
          )
          .map((credential) => credential.metadata.credentialDefinitionId)

        const hasCredentials = parsedData.requiredSkills.every((skill) => credentialDefinitionIds.includes(skill))

        sendResponseToSilentnotification({ hasCredentials, travelTime })

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        store.dispatch(
          AppThunks.storeEmergencyInfo({
            emergency: { ...parsedData.emergency, travelTime },
            coordinate: parsedData.location,
          })
        )

        if (connection?.id) {
          const erm = agent.injectionContainer.resolve(EmergencyResponseModule)
          void erm.sendEmergencyResponse(connection.id, hasCredentials, travelTime)
        }
      }
      void run()
    },
    (error) => console.error(error)
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRegister = ({ token }: { os: string; token: string }, store: any) => {
  console.log('TOKEN: ' + token)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
  store.dispatch(AppThunks.deviceToken({ deviceToken: token }))
}

const onRegistrationError = (err: Error) => console.error(err)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupNotificationsHandler = (agent: Agent, store: any) => {
  PushNotification.configure({
    onRegister: (token) => onRegister(token, store),
    onNotification: (notification) => onNotification(notification, agent, store),
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
