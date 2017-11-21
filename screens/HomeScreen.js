import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/StyledText';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
      header: <Header />
  };

  static setHidden = {
      hidden: true
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello form the other world...</Text>


    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
