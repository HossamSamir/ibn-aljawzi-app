import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Swiper from 'react-native-swiper';

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

  render() {
    return (
            <Swiper style={styles.wrapper}
            showsButtons={true} buttonWrapperStyle={{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute',  bottom: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, marginTop: '50%'}}
            nextButton={
                <TouchableOpacity onPress={ () => {
                  this.props.navigation.navigate('Main', {})
                }}>
                    <Text style={{}}>Get Started</Text>
                </TouchableOpacity>
            }
            prevButton={
                <TouchableOpacity onPress={ () => {
                  this.props.navigation.navigate('Main', {})
                }}>
                    <Text style={{}}>Skip</Text>
                </TouchableOpacity>
            }
            >
            <View style={styles.slide1}>
                <TouchableOpacity onPress={ () => {
                  this.props.navigation.navigate('Main', {})
                }}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
