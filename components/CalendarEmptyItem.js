import React from 'react'
import { View, Text } from 'react-native'
import DateHeader from './DateHeader'

export default class CalendarItem extends React.PureComponent {
  render(){
    const {date, style} = this.props

    const formattedDate = date !== undefined ? date.toString("MMMM d, yyyy") : props.toString("MMMM d, yyyy")

    return (
      <View style = {style}>
        <DateHeader date = {formattedDate} fontSize = {30} color = {'#6474E5'}/>
        <Text>No Data for this day</Text>
      </View>
    );
  }

}
