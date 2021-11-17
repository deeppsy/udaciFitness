import React from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Image, ImageBackground } from 'react-native';
import * as Location from 'expo-location'
import { Foundation } from '@expo/vector-icons'
import TextBtn from './TextBtn'
import { calculateDirection } from '../utils/helpers'
import * as ImagePicker from 'expo-image-picker'
import ImageEditor from '@react-native-community/image-editor'
export default class Live extends React.Component {
  state = {
    coords : null,
    status : null,
    direction : '',
    error : null,
    bounceValue : new Animated.Value(1),
    image : null,
  }

  askPremession = () => {
    this.setState({
      error : null,
    });
    Location.requestForegroundPermissionsAsync()
    .then(({status}) => {
      if (status === 'granted') {
        return this.setLocation();
      }
      else {
        return this.setState({
          status : status
        });
      }
    })
    .catch(err => {
      this.setState({
        error : err,
        status : 'undetermind'
      });
    })
  }

  setLocation = () => {
    Location.watchPositionAsync({
      enableHighAccuracy : true,
      timeInterval: 1,
      distanceInterval:1,
    },({coords}) => {
      const newDirection = calculateDirection(coords.heading)
      const { direction, bounceValue } = this.state
      if (direction !== newDirection) {
        Animated.sequence([
          Animated.timing( bounceValue, { duration: 200, toValue: 1.04, useNativeDriver: true} ),
          Animated.spring( bounceValue, {toValue:1, friction:4, useNativeDriver: true} )
        ]).start()
      }
      this.setState({
        coords,
        status : 'granted',
        direction : newDirection
      })
    }).catch(err => {
      this.setState({
        error : err,
        status : 'undetermind'
      });
    })
  }

  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowEditing:true,
      aspect : [2,1],
    }).then(res => {
      if (res.cancelled) {
        return
      }
      else {
        const cropData = {
          offset: { x:0, y:0 },
          size: {
            width:res.width,
            height:res.heght,
          },
          displaySize: {
            width:200,
            height:100,
          },
          resizeMode: 'contain' ,
        }
        this.setState({image:res.uri})
    }
    })
    .catch(err => {console.warn('imagePicker', err);})

  }

  componentDidMount () {
    this.askPremession()
  }

  render(){
    const { status, coords, direction, error, bounceValue, image } = this.state
    if (status === null) {
      return (
        <ActivityIndicator style = {{flex:1, marginTop:30}} />
      );
    }
    if (status === 'denied') {
      return (
        <View style = {styles.center}>
          <Foundation name = 'alert' size = {40}/>
          <Text> Location Access denied, You can fix this by going to setting and enabling location for this app!</Text>
        </View>
      );
    }
    if (status === 'undetermind') {
      return (
        <View style = {styles.center}>
          <Foundation name = 'alert' size = {40}/>
          <Text>{error && `${error}`}</Text>
          <Text>You need to enable loction services to run this app feature!</Text>
          <TextBtn
            onPress = {this.askPremession}
            text ={'Enable location'}
            style = {{
              container: styles.button,
              text: styles.buttonText,
            }}
          />
        </View>
      );
    }

    return (
      <View style = {styles.container}>
        <ImageBackground source={{uri:image}} resizeMode="cover" style={styles.image}>
          <View style = {styles.directionContainer}>
            <Text style = {styles.header} >You Are Heading</Text>
            <Animated.Text style = {[styles.direction, { transform: [{scale: bounceValue}] }]}>{ direction ? direction : 'not detected' }</Animated.Text>
          </View>
          <View style = {styles.metricContainer}>
            <TouchableOpacity onPress = {this.pickImage}>
              <Text style = {{color:'white', fontSize:20}}>change your background</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.metricContainer}>

            <View style = {styles.metric}>
              <Text style = {[styles.header, {color:"white"}]}>
                Altitude
              </Text>
              <Text style = {[styles.subHeader, {color:"white"}]}>
                {Math.round(coords.altitude * 3.2808)} Feet
              </Text>
            </View>
            <View style = {styles.metric}>
              <Text style = {[styles.header, {color:"white"}]}>
                Speed
              </Text>
              <Text style = {[styles.subHeader, {color:"white"}]}>
                {(coords.speed * 2.2369).toFixed(1)} MPH
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: '#6474E5',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 20,
  },
  buttonText :{
    color: 'white',
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  direction: {
    color: '#6474E5',
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6474E5',
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
})
