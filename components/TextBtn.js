import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextBtn({ onPress, text, style }) {
  return (
    <TouchableOpacity
      onPress = {onPress}
      style = {style ? (style.container ? style.container : styles.btn): styles.btn}
    >
      <Text style = {style? style.text : null}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn:{
    flex: 0.5,
    backgroundColor: '#F2F1EF',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
