import AsyncStorage from '@react-native-async-storage/async-storage'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar'

export function submitEntry({ key, entry }) {

  const newItem = JSON.stringify({
    [key] : entry
  })
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, newItem)
}

export function removeEntry(key) {

  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((res) => {
    const data = JSON.parse(res)
    data[key] = undefined
    const newData = JSON.stringify(data)
    return AsyncStorage.setItem(CALENDAR_STORAGE_KEY,newData);
  })

}

export const fetchCalenderResults = () => {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}
