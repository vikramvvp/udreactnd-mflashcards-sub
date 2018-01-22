import { Notifications, Permissions } from 'expo'
import {AsyncStorage} from 'react-native'

const NOTIFICATION_KEY = 'vikram:flashcards:notifications'

function createNotification () {
  return {
    title: 'Study your quizzes!',
    body: "👋 don't forget to study atlease one quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  console.log('set loc notif')
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(result => {
      console.log('set loc notif result',result)
      return JSON.parse(result)
    })
    .then((data) => {
      console.log('set loc notif data',data)
      // if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            console.log('status',status)
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate())
              tomorrow.setHours(19)
              tomorrow.setMinutes(44)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'minute',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
            else {
              console.log('status not granted')
            }
          })
          .catch(reason => {
            console.log('permissions',reason)
          })
      // }
    })
    .catch(reason => {
      console.log('set local notif error',reason)
    })
}
