import React from 'react'
import { View, Text, FlatList, ScrollView, StyleSheet, Button} from 'react-native'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Ionicons } from '@expo/vector-icons'
import MySlider from './MySlider'
import MyStepper from './MyStepper'
import DateHeader from './DateHeader'
import TextBtn from './TextBtn'
import MetricItem from './MetricItem'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { grey } from '../utils/colors'
import Resubmit from './Resubmit'

class AddEntry extends React.Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { step, max } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count,
      };

    })
  }

  decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] - step
      return {
        ...state,
        [metric]: count > 0 ? count : 0,
      };

    })
  }

  slide = (metric, value) => {
    this.setState((state) => {
      return {
        [metric]: value,
      };

    })
  }

  handleSubmit = async () => {
    const key = timeToString()
    const entry = [this.state]
    const { dispatch, navigation } = this.props
    dispatch(addEntry({
      [key] : entry
    }))
    await this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    })

    await submitEntry({key, entry})
    await clearLocalNotification()
      .then(setLocalNotification)
    navigation.navigate('History')

  }

reSubmit = () => {
  const key = timeToString()
  const { dispatch } = this.props
  dispatch(addEntry({
    [key] : getDailyReminderValue()
  }))
  removeEntry(key)


}
renderItem = ({item}) => {
  const metricsInfo = getMetricMetaInfo()
  const value = this.state[item]
  return (
    <View style = {styles.contentRow}>
      <MetricItem
        metric = {item}
        metricInfo = {metricsInfo[item]}
        value = {value}
        onIncrement = {this.increment}
        onDecrement = {this.decrement}
        slide = {this.slide}
      />
    </View>

  );
}

render(){
  const metricsInfo = getMetricMetaInfo()
  let { alreadyLogged} = this.props
  if (alreadyLogged) {
    return (
      <View style = {styles.container} >
        <Button
          title="Go to History"
          onPress={() => this.props.navigation.navigate('History')}
        />
        <Resubmit reSubmit = {this.reSubmit}/>
      </View>

   )
  }
  else {
      return (
        <View style = {styles.container} >
          <Button
          title="Go to History"
          onPress={() => this.props.navigation.navigate('History')}
        />
          <View style = {styles.header}>
            <DateHeader date = {(new Date()).toLocaleDateString()}/>
          </View>
          <View style = {styles.content}>
            <FlatList
              data = {Object.keys(metricsInfo)}
              renderItem = {this.renderItem}
              keyExtractor={(item) => item.toString()}
              contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}
            />
          </View>
          <View style = {styles.footer}>
            <TextBtn onPress = {this.handleSubmit} text = {'Submit'}/>
          </View>
        </View>
        )
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6474E5'

  },
  content : {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F6F6F2'
  },
  footer : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6474E5',
  },
  contentRow : {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F1EF'
  },

});


const mapStateToProps = (state) => {
  const key = timeToString()
  return {
    alreadyLogged : state[key]
                      ? (state[key][0] && typeof state[key][0].today === 'undefined')
                      : false,
  };

}

export default connect(mapStateToProps)(AddEntry)
