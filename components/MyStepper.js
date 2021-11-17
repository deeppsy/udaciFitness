import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
export default class MyStepper extends React.Component {
  render(){
    const { step, value, max, unit, onIncrement, onDecrement} = this.props
    return (
      <View style = {styles.container}>
        <View style = {styles.containerRow}>
          <View style = {styles.box}>
            <View style = {styles.boxItem} >
                <TouchableOpacity style = {styles.btn} onPress = { onDecrement }>
                  <FontAwesome name = 'minus' size = {30} color = {'red'} />
                </TouchableOpacity>
                <TouchableOpacity style = {styles.btn} onPress = { onIncrement }>
                  <FontAwesome name = 'plus' size = {30} color = {'green'} />
                </TouchableOpacity>
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
    alignItems: 'center',
    alignSelf: 'center',
  },
  box2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  btn: {
    flex: 1,
    padding: 5,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6474E5'
  }
});
