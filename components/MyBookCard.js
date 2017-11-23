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

export default class MyBookCard extends React.Component {
  render() {
    return (
        <View style={{ margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={this.props.book_photo}
           style={{width: 100, height: 140, borderRadius: 10, marginBottom: 10}} />
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#106234' }}>{this.props.book_name.toUpperCase()}</Text>
            <Text style={{  }}>{this.props.author_name}</Text>
        </View>
    );
  }
}
