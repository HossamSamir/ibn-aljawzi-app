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
        <View style={{ margin: 20,  }}>
        <Image source={this.props.book_photo}
           style={{width: 160, height: 170, borderRadius: 10, marginBottom: 10}} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#106234' }}>{this.props.book_name.toUpperCase()}</Text>
            <Text style={{  }}>{this.props.author_name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
            <Ionicons
              name='ios-star'
              size={19}
              color='#EBD31C'
              style={{ marginHorizontal: 1, backgroundColor: 'transparent' }}
            />
            <Ionicons
              name='ios-star'
              size={19}
              color='#EBD31C'
              style={{marginHorizontal: 1, backgroundColor: 'transparent' }}
            />
            <Ionicons
              name='ios-star'
              size={19}
              color='#EBD31C'
              style={{marginHorizontal: 1, backgroundColor: 'transparent' }}
            />
            <Ionicons
              name='ios-star-half'
              size={19}
              color='#EBD31C'
              style={{marginHorizontal: 1, backgroundColor: 'transparent' }}
            />
            <Ionicons
              name='ios-star-outline'
              size={19}
              color='#EBD31C'
              style={{marginHorizontal: 1, backgroundColor: 'transparent' }}
            />
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#106234', paddingVertical: 3, paddingHorizontal: 10,  borderRadius: 15, marginLeft: 8, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons
                  name='ios-add'
                  size={18}
                  color='white'
                  style={{paddingRight: 3, fontWeight: 'bold', backgroundColor: 'transparent' }}
                />
                <Text style={{ color: 'white' }}>Add</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
  }
}
