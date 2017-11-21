import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  ListView,
  TextInput
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class Header extends React.Component {
  render() {
    return (
        <View style={{ flex: .1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  backgroundColor: '#106234', paddingVertical: 5, paddingHorizontal: 15, paddingTop: Constants.statusBarHeight }}>
            <View style={{ flex: .5, paddingRight: 50}}>
            <Ionicons
              name='ios-menu-outline'
              size={40}
              color='white'
            />
            </View>
            <View style={{ flex: .5, paddingRight: 10}}>
            <Image
              style={{
                  resizeMode: 'contain',
                  width: '100%',
                  height: '100%',
              }}
              source={require('../assets/images/logo.png')}
            />

            </View>
            <View style={{ flex: 3, }}>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder='seacrh'
                    placeholderTextColor='rgba(16, 98, 52, 0.5803921568627451)'
                    style={{ backgroundColor: 'white', borderRadius: 10, fontSize: 20, color: '#106234', padding: 5,  paddingLeft: 20 }}
                />
            </View>
        </View>
    );
  }
}
