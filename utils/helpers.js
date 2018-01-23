import { Notifications, Permissions } from 'expo'
import {AsyncStorage} from 'react-native'

const NOTIFICATION_KEY = 'vikram:flashcards:notifications'

const createNotification = () => ({
  title: 'Study your quizzes!',
  body: "👋 don't forget to study atleast one quiz for today!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  }
})

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(result => {
      return JSON.parse(result)
    })
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate()+1)
              tomorrow.setHours(8)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
          .catch(reason => {
            console.log('permissions error: ',reason)
          })
      }
    })
    .catch(reason => {
      console.log('set local notif error: ',reason)
    })
}
