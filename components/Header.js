import React from 'react';
import {
  Image,
  Platform,
  Text,
  View,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Header extends React.Component {
  render() {
    return (
        <View style={{ flex: .1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  backgroundColor: '#106234', paddingTop: Platform.OS == 'ios' ? 20 : 0, paddingVertical: 0, paddingHorizontal: 10, }}>
            <View style={{ flex: .5, marginLeft: -10, paddingRight: 60}}>
            <Image
              style={{
                  resizeMode: 'contain',
                  width: '100%',
                  height: '100%',
              }}
              source={require('../assets/images/menu.png')}
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
            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder='seacrh'
                    placeholderTextColor='rgba(16, 98, 52, 0.5803921568627451)'
                    style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, fontSize: 18, color: '#106234', padding: 1,  paddingLeft: 20, paddingRight: 35 }}
                />
                <Ionicons
                  name='ios-search-outline'
                  size={23}
                  color='rgba(16, 98, 52, 0.5803921568627451)'
                  style={{ marginLeft: -30, backgroundColor: 'transparent' }}
                />
            </View>
        </View>
    );
  }
}
