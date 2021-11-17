import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, Button, Image, Animated } from 'react-native'
import { receiveEntries, addEntry } from '../actions'
import { getDailyReminderValue, timeToString } from '../utils/helpers'
import { fetchCalenderResults } from '../utils/api'
import {Agenda as UdaciFitnessCalendar } from 'react-native-calendars'
import CalendarItem from './CalendarItem'
import CalendarEmptyItem from './CalendarEmptyItem'
import AppLoading from 'expo-app-loading'
import { Ionicons } from '@expo/vector-icons'


class History extends React.Component {
  state = {
    ready: false,
    opacity: new Animated.Value(0),
    height: 200,
    width: 200,
  }

  componentDidMount(){
    const { dispatch } = this.props
    fetchCalenderResults()
      .then(entries => {
        return dispatch(receiveEntries(entries))
      })
      .then(({entries, ...rest}) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()] : getDailyReminderValue()
          }))
        }
      })
      .then(() => {
        const { opacity} = this.state
        Animated.timing(opacity, {toValue:1, duration:2000, useNativeDriver: true}).start()
        setTimeout(() => {this.setState({
          ready: true
        })}, 1000)

      }).catch(err => {console.warn(err);})
  }

  navigateTo = (date) => {
    this.props.navigation.navigate(
              'EntryDetail',
              { entryId: timeToString(date) }
            )
  }

  render() {
    const { ready } = this.state
    const { opacity, width, height } = this.state

    if (ready) {
      const { entries } = this.props
      const minDate = timeToString(new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
      return (
        <View style={{flex:1}}>

          <Button
          title="Go to Add Entry"
          onPress={() => this.props.navigation.navigate('AddEntry')}
        />
          <UdaciFitnessCalendar
            items={entries}
            renderItem={(item, firstItemInDay, date) => {return (
              < CalendarItem item = {item} date = {date} firstItemInDay = {true} style = {styles.item} navigation = {this.navigateTo}/>
            )}}
            renderEmptyDate={(date) => {return (
              < CalendarEmptyItem  date = {date} style = {styles.item}/>
            )}}
            minDate={minDate}
            maxDate = {timeToString()}
            pastScrollRange={12}
            futureScrollRange={1}
          />
        </View>
      );
    }
    else {
      return (
        <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Animated.Image
            style = {{width, height, opacity}}
            source = {require('../logo.png')}
            />
        </View>
      );
    }


  }
}

const styles = StyleSheet.create({
  item : {
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios'? 16 : 10,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    shadowOpacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    }
  }
})

const mapStateToProps = (entries) => {
  return {
    entries
  };
}

export default connect(mapStateToProps)(History)
