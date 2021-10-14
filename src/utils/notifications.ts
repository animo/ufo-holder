/* eslint-disable no-console */
import type {
  Notification as _Notification,
  NotificationCompletion,
  Registered,
  RegistrationError,
} from 'react-native-notifications'

import { NotificationBackgroundFetchResult, Notifications as _Notifications } from 'react-native-notifications'

/**
 * The notification payload type
 */
type NotificactionPayload = { data: string }

/**
 * Inject the new notification payload type
 */
type Notification = Omit<_Notification, 'payload'> & { payload: { payload: NotificactionPayload } }

export type RegisteredDevice = Registered

export type RegisteredDeviceDenied = RegistrationError

/**
 * Handles everything with push notifications as abstract as possible
 */
export class Notifications {
  /**
   * ONLY BE ABLE TO REGISTER ONCE
   */
  public handleEvents() {
    this.handleBackground()
    this.handleForeground()
    this.handleOpened()
  }

  /**
   * Uploads the `deviceToken` and `deviceVendor` (will also ask for permissions on iOS)
   * @todo Check if this asks for permissions
   */
  public static register() {
    // TODO: check options
    _Notifications.registerRemoteNotifications()
  }

  public static registered(cb: (event: RegisteredDevice) => void) {
    _Notifications.events().registerRemoteNotificationsRegistered(cb)
  }

  public static registeredError(cb: (event: RegisteredDeviceDenied) => void) {
    _Notifications.events().registerRemoteNotificationsRegistrationFailed(cb)
  }

  /**
   * Handle notifications that occur in the foreground
   */
  private handleForeground() {
    _Notifications
      .events()
      .registerNotificationReceivedForeground(
        (notification: Notification, completion: (response: NotificationCompletion) => void) => {
          console.log('Notification Received - Foreground: ', notification)

          completion({ alert: false, sound: false, badge: false })
        }
      )
  }

  /**
   * Handle notifications that occur in the background
   */
  private handleBackground() {
    _Notifications
      .events()
      .registerNotificationReceivedBackground(
        (notification: Notification, completion: (response: NotificationBackgroundFetchResult) => void) => {
          console.log('Notification Received - Background: ', notification.payload)

          completion(NotificationBackgroundFetchResult.NO_DATA)
        }
      )
  }

  /**
   * Handle the opening of any notification (foreground or background)
   */
  private handleOpened() {
    _Notifications.events().registerNotificationOpened((notification: Notification, completion: () => void) => {
      console.log('Opened a notification: ', notification.payload.payload.data)
      completion()
    })
  }

  /**
   * Pushes a local notification to the application
   *
   * @todo What does every field do
   *
   * @param title title of the notification
   * @param body body of the notification
   * @param payload additional data needed for execution
   */
  public static pushLocalNotification(title: string, body: string, payload: NotificactionPayload) {
    const notification: _Notification = {
      title,
      body,
      payload,
      badge: 1,
      identifier: '',
      sound: '',
      thread: '',
      type: '',
    }

    _Notifications.postLocalNotification(notification)
  }

  /**
   * Sets up a channel for push notifications (ANDROID ONLY)
   *
   * @param id channel id
   * @param name channel name
   * @param description description of the channel
   * @param importance how important the notification is
   *        5 is an emergency here and 1 is a normal notification
   */
  public static setNotificationChannelForAndroid(id: string, name: string, description: string, importance: 1 | 5) {
    _Notifications.android.setNotificationChannel({
      channelId: id,
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
   * Registers the token and vendor at a notification server
   * @param data token and vendor of the device
   */
  public static registerDeviceAtNotificationServer(data: { token: string; platform: 'ios' | 'android' }) {
    console.log(`Registered: ${data.token}, ${data.platform}`)
  }
}
