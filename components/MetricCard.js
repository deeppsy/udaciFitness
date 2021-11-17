import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'

export default function MetricCard({metrics}) {

  return (
    <View style = {{flex:1}}>
      {
        Object.keys(metrics).map((metric) => {
          const { getIcon, displayName, unit } = getMetricMetaInfo(metric)
          return (
            <View style = {styles.metric} key = {metric}>
              <View style = {{flex:1}}>
                {getIcon()}
              </View>
              <View style = {{flex:3}}>
                <Text style = {styles.header}>{displayName}</Text>
                <Text style = {styles.txt}>{metrics[metric]} {unit}</Text>
              </View>
            </View>
          );
        })
      }
    </View>

  );

}

const styles = StyleSheet.create({
  metric: {
    flex:1,
    flexDirection :'row',
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  header:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  txt:{
    fontSize: 15,
    color: '#194F92'
  }
})
