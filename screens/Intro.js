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
            showsButtons={true}
            buttonWrapperStyle={{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute',  bottom: 0, flex: 1, paddingHorizontal: 30, paddingVertical: 10, marginTop: '68%'}}
            activeDot={<View style={{backgroundColor:'#106234', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 3,}} />}
            nextButton={
                    <Text style={{ display: 'none' }}></Text>
            }
            prevButton={
                <TouchableOpacity onPress={ () => {
                  this.props.navigation.navigate('Main', {})
                }}>
                    <Text style={{ color: '#0366d6' }}>Skip</Text>
                </TouchableOpacity>
            }
            >
            <View style={styles.slide}>
                <Image
                    source={require('../assets/images/1.jpg')}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
            </View>
            <View style={styles.slide}>
                <Image
                    source={require('../assets/images/2.jpg')}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
            </View>
            <View style={styles.slide}>
                <Image
                    source={require('../assets/images/3.jpg')}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
            </View>
            <View style={styles.slide}>
                <Image
                    source={require('../assets/images/4.jpg')}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
            </View>
            <View style={styles.slide}>
                <Image
                    source={require('../assets/images/5.jpg')}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 10 }} onPress={ () => {
                  this.props.navigation.navigate('Main', {})
                }}>
                    <Text style={{ backgroundColor: '#106234', color: 'white', padding: 10, marginRight: 10, fontWeight: 'bold', borderRadius: 10 }}>Get Started</Text>
                </TouchableOpacity>
            </View>
          </Swiper>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
      backgroundColor: 'white'
  },
  slide: {
    flex: 1,
  }
})
