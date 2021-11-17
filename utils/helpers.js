import React from 'react';
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'

const NOTIFICATION_KEY = 'Fitness:notifications'

export function isBetween (num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

const styles = StyleSheet.create({
  iconContainer: {
    flex:1.5,
    padding: 10,
    borderRadius: 8,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30
  },
})

export const getMetricMetaInfo = (metric) => {
  const info  ={
    run: {
      displayName: 'Run',
      max: 50,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon(){
        return (
          <View style = {[styles.iconContainer, {backgroundColor: red}]}>
            <MaterialIcons
              name = 'directions-run'
              color = { white }
              size = { 50 }
            />
          </View>
        );
      }
    },
    bike: {
      displayName: 'Bike',
      max: 100,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon(){
        return (
          <View style = {[styles.iconContainer, {backgroundColor: orange}]}>
            <MaterialCommunityIcons
              name = 'bike'
              color = { white }
              size = { 40 }
            />
          </View>
        );
      }
    },
    swim: {
      displayName: 'Swim',
      max: 9900,
      unit: 'meters',
      step: 100,
      type: 'steppers',
      getIcon(){
        return (
          <View style = {[styles.iconContainer, {backgroundColor: blue}]}>
            <MaterialCommunityIcons
              name = 'swim'
              color = { white }
              size = { 50 }
            />
          </View>
        );
      }
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      unit: 'hours',
      step: 1,
      type: 'slider',
      getIcon(){
        return (
          <View style = {[styles.iconContainer, {backgroundColor: lightPurp}]}>
            <FontAwesome
              name = 'bed'
              color = { white }
              size = { 50 }
            />
          </View>
        );
      }
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      unit: 'rating',
      step: 1,
      type: 'slider',
      getIcon(){
        return (
          <View style = {[styles.iconContainer, {backgroundColor: pink}]} >
            <MaterialCommunityIcons
              name = 'food'
              color = { white }
              size = { 50 }
            />
          </View>
        );
      }
    },
  }
  return typeof metric === 'undefined'
    ? info
    : info[metric]
}

export const getDailyReminderValue = () => {
  return [{
    'today': "👋 Don't forget to log your data for today"
  }];
}

export const clearLocalNotificatio = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(() => {
          Notifications.cancelAllScheduledNotificationsAsync()
          .catch(err => {console.warn('cancelAllScheduledNotificationsAsync error :', err);})
        })
        .catch(err => {console.warn('clearLocalNotificatio error :', err);})
}
const createNotification = () => {
  return {
    title: 'Log Your Stats!',
    body: "👋 Don't forget to log your stats for today",
    ios: {
      sound:true
    },
    android:{
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then( JSON.parse )
  .then(data => {
    if (data === null) {
      Notifications.requestPermissionsAsync()
      .then(({status}) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync().catch(err => {console.warn('cancelAllScheduledNotificationsAsync',err);})
          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)
          Notifications.scheduleNotificationAsync({
            content: createNotification(),
            trigger: {
              channelId: 'default',
              seconds: 86400,
              repeats: true,
            }
          }).catch(err => {console.warn('scheduleNotificationAsync',err);})
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          .catch(err => {console.warn('AsyncStorage set Item error');})
        }
      })
      .catch(err => {console.warn("error requestPermissionsAsync");})
    }
  }).catch(err => {console.warn('requestPermissionsAsync',err);})
}
