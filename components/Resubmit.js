import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TextBtn from './TextBtn'

export default function Resubmit({ reSubmit }) {
  return (
    <View style = {styles.container} >
     <View style = {styles.content} >
       <Ionicons
        name = {Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy-outline'}
        size = {200}
        color = {'#F2F1EF'}
        />
      <Text style = {{ color : '#F2F1EF', fontSize:35, textAlign:'center' }}>You Already Logged Your Information for today!</Text>
     </View>
     <View style = {styles.btn}>
      <TextBtn onPress = {reSubmit} text = {'Resubmit'}/>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6474E5'
  },
  content:{
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn:{
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'baseline',
  }
})
