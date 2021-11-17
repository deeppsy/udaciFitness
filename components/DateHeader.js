import React from 'react'
import { View, Text } from 'react-native'

export default class DateHeader extends React.Component {
  render(){
    const { date, fontSize, color } = this.props
    return (
      <View style = {{flex:1, padding:10}}>
        <Text style = {{
            color: color? color : '#F2F1EF',
            fontSize:fontSize? fontSize : 20
          }}>
          {date}
        </Text>
      </View>
    );
  }
}
