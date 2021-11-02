import type { Notification } from 'react-native-notifications'

import { NotificationBackgroundFetchResult, Notifications as _Notifications } from 'react-native-notifications'

export class Notifications {
  /**
   * Register everything when onboarding accepts push notifications
   */
  public setup() {
    this.register()
    this.registerOnServerSuccess()
    this.registerOnServerFailed()
    this.registerChannels()
  }

  /**
   * Register on app initialization
   */
  public registerHandlers() {
    this.handleBackground()
    this.handleOpened()
  }

  /**
   * Requests permissions on iOS and refreshes the token on Android
   * Should be called at the onboarding stage and never again
   */
  private register() {
    _Notifications.registerRemoteNotifications()
  }

  /**
   * Emits the device token when register call was succesful
   * @todo Should send the token to the server
   */
  private registerOnServerSuccess() {
    _Notifications.events().registerRemoteNotificationsRegistered(({ deviceToken }) => {
      // eslint-disable-next-line no-console
      console.log(`TOKEN: ${deviceToken}`)
    })
  }

  /**
   * Handler for when registering for remote notifications fails
   * @todo Should handle errors properly
   */
  private registerOnServerFailed() {
    _Notifications.events().registerRemoteNotificationsRegistrationFailed(({ code, domain, localizedDescription }) => {
      // eslint-disable-next-line no-console
      console.log(`code: ${code}`)
      // eslint-disable-next-line no-console
      console.log(`domain: ${domain}`)
      // eslint-disable-next-line no-console
      console.log(`localizedDescription: ${localizedDescription}`)
    })
  }

  /**
   * Adds a generic handler for the background notifications
   */
  private handleBackground() {
    _Notifications
      .events()
      .registerNotificationReceivedBackground(
        (_: Notification, completion: (response: NotificationBackgroundFetchResult) => void) => {
          completion(NotificationBackgroundFetchResult.NO_DATA)
        }
      )
  }

  /**
   * Handler function for when a user opens a notification
   * @todo check if this is useful
   */
  private handleOpened() {
    _Notifications.events().registerNotificationOpened((notification, completion: () => void) => {
      // eslint-disable-next-line no-console
      console.log(notification)
      completion()
    })
  }

  private setNotificationChannelForAndroid(id: string, name: string, description: string, importance: 1 | 5) {
    _Notifications.android.setNotificationChannel({
      channelId: id,
      groupId: id,
      groupName: name,
      name,
      importance,
      description,
      enableLights: true,
      enableVibration: true,
      showBadge: true,
      vibrationPattern: importance === 5 ? [200, 1000, 500, 1000, 500] : undefined,
    })
  }

  /**
   *  Register notification channels for android.
   *  @todo **THESE ARE MOCK CHANNELS**
   *  @todo research number meanings on importance
   */
  private registerChannels() {
    this.setNotificationChannelForAndroid('default', 'Default', 'Default channel', 5)
    this.setNotificationChannelForAndroid('emergency', 'Emergency', 'Local Emergencies', 5)
    this.setNotificationChannelForAndroid('wallet', 'Wallet', 'Wallet requests', 5)
  }
}
