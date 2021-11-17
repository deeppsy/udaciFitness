import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'

export default class MySlider extends React.Component {
  render(){
    const { step, value, max, unit, onChange} = this.props
    return (
      <View style = {styles.container}>
        <View style = {styles.containerRow}>
          <View style = {styles.box}>
            <View style = {styles.boxItem} >
              <View style = {{flex:1, alignItems:'stretch'}}>
                <Slider
                  value = {value}
                  step = {step}
                  maximumValue = {max}
                  minimumValue = {0}
                  onValueChange = {onChange}
                  thumbTintColor = {'#6474E5'}
                  minimumTrackTintColor ={'#194F92'}
                  />
              </View>
            </View>
          </View>
          <View style = {styles.box2}>
              <Text style = {{ color:'#413F3D' }} >{value}</Text>
              <Text style = {{ color:'#413F3D' }} >{unit}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    alignItems: 'stretch',
    justifyContent: 'center',


  },
  containerRow:{
    flex: 1,
    flexDirection: 'row'
  },
  box: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch'

  },
  boxItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  box2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
