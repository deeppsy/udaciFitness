import React from 'react'
import { View, StyleSheet } from 'react-native'
import MySlider from './MySlider'
import MyStepper from './MyStepper'

export default function MetricItem(props) {
  const { metricInfo, metric, value, onIncrement, onDecrement, slide } = props
  const { getIcon, type, ...rest } = metricInfo
  return (
    <View style = {styles.containerRow}>
      <View style = {{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
        {getIcon()}
        {
          type !== 'steppers'
          ? <MySlider
              value = {value}
              onChange={(value) => slide(metric, value)}
              {...rest}
            />
          : <MyStepper
              value = {value}
              onIncrement = {() => onIncrement(metric)}
              onDecrement = {() => onDecrement(metric)}
              {...rest}
            />
          }
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    padding: 5,
  },
});
