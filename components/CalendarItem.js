import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'

export default class CalendarItem extends React.PureComponent {
  render(){

    const {date, item, firstItemInDay, style} = this.props
    let today = null
    let metrics = null

    if (item) {
      if (item.today) {
        today = item.today
      }else {
        metrics = {...item}
      }
    }

    const formattedDate = date !== undefined ? date.toString("MMMM d, yyyy") : props.toString("MMMM d, yyyy")

    return (
      <View style = {style}>
        <DateHeader date = {formattedDate} fontSize = {30} color = {'#6474E5'}/>
      {
        today
          ? (
              <Text style = {{flex:1, fontSize:15, padding: 10, justifyContent: 'center', alignItems: 'center',textAlign:'center'}}>{today}</Text>
            )
          : (
              <TouchableOpacity onPress = {() => this.props.navigation(date)}>
                <MetricCard metrics = {metrics}/>
              </TouchableOpacity>
            )
      }
      </View>
    );
  }

}
