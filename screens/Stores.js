import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';

export default class Stores extends React.Component {

  static navigationOptions = {
      header: <Header />
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This screen still under development...</Text>
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
