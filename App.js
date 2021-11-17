import React from 'react';
import { View, StyleSheet, StatusBar,Platform } from 'react-native';
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render(){
    return (
      <SafeAreaProvider>
        <Provider store={createStore(reducer)}>
          <SafeAreaView style={styles.container}  edges={['right', 'bottom', 'left']}>
            <MySatusBar backgroundColor = {'#6474E5'} barStyle = {'light- content'}/>
            <AppContainer />
          </SafeAreaView>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: Platform.OS === 'ios'? 0 : 10,
  },

});

const TabNavigator = Platform.OS !== 'ios'
  ?createMaterialTopTabNavigator(
    {
      History: {
        screen: History,
        navigationOptions:{
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const iconName = focused
              ? 'md-home'
              : 'md-home-outline';
            return <Ionicons name={iconName} size={24} color={tintColor} />
            }
        }
      },
      AddEntry: {
        screen: AddEntry,
        navigationOptions:{
          tabBarLabel: 'Add Entry',
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const iconName = focused
              ? 'add-circle'
              : 'add-circle-outline';
            return <Ionicons name={iconName} size={24} color={tintColor} />
            }
        }
      },
      Live: {
        screen: Live,
        navigationOptions:{
          tabBarLabel: 'Live',
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const iconName = focused
              ? 'live-tv'
              : 'live-tv';
            return <MaterialIcons name={iconName} size={24} color={tintColor} />
            }
        }
      }
    },
    {
    initialRouteName: 'History',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions:{
      headerShown: false,
    },
    tabBarOptions: {
      activeTintColor: '#F2F1EF',
      inactiveTintColor: 'grey',
      showIcon:true,
      showLabel: true,
    }
    }

  )
  : createBottomTabNavigator(
    {
    History: History,
    AddEntry: AddEntry,
    }
  );

const StackNavigator = createStackNavigator(
  {
    home: {
      screen: TabNavigator,
      navigationOptions: {
         headerShown: false,
       },
     },
    EntryDetail: {
      screen: EntryDetail,
      navigationOptions: ({ navigation }) => ({
        title:'Entry Details',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'purple',

         },
       }),
     },
  }
);
const MyDrawerNavigator = createDrawerNavigator({
  History: {
    screen: History,
  },
  AddEntry: {
    screen: AddEntry,
  },
});

const MySatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style = {{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor = {backgroundColor} {...props} />
    </View>
  );
}

const AppContainer = createAppContainer(StackNavigator);
