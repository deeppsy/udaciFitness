import React, {Component} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import MetricCard from './MetricCard'

class EntryDetail extends Component {

  static navigationOptions = ({navigation}) => {
    const { entryId } = navigation.state.params
    const year = entryId.slice(0, 4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)
    return {
      title: `${day}/${month}/${year}`
    };
  }

  render() {
    const { metrics, entryId } = this.props
    return (
      <View style = {styles.container}>
        <MetricCard metrics = {metrics}/>
      </View>

     )
   }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: Platform.OS === 'ios'? 16 : 10,
      padding: 10,
      margin: 5,
      justifyContent: 'space-between',
      alignItems: 'stretch',
      alignContent: 'center',

      }
    })

const mapStateToProps = (state, {navigation}) => {
  const {entryId} = navigation.state.params
  const metrics = state[entryId][0]
  return {
    metrics,
    entryId,
  };
}

export default connect(mapStateToProps)(EntryDetail)
