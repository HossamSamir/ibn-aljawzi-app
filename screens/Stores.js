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
import { Container, Header, Content, Tab, Tabs, TabHeading } from 'native-base';
import MyHeader from '../components/Header';
import MapTab from '../components/MapTab';
import StoresListTab from '../components/StoresListTab';

export default class Stores extends React.Component {

  static navigationOptions = {
      header: <MyHeader />
  };

  render() {
    return (
        <Tabs initialPage={0}>
          <Tab heading = {
              <TabHeading>
                  <Ionicons
                    name='ios-map'
                    size={28}
                    style={{ color: Platform.OS === 'ios' ? '#106234' : 'white', marginRight: 10 }}
                  />
                  <Text style={{ color: Platform.OS === 'ios' ? '#106234' : 'white' }}>Maps</Text>
              </TabHeading>
          }>
            <MapTab />
          </Tab>
          <Tab heading = {
              <TabHeading>
                  <Ionicons
                    name='ios-list-outline'
                    size={28}
                    style={{ color: Platform.OS === 'ios' ? '#106234' : 'white', marginRight: 10 }}
                  />
                  <Text style={{ color: Platform.OS === 'ios' ? '#106234' : 'white' }}>Stores List</Text>
              </TabHeading>
          }>
            <StoresListTab />
          </Tab>
        </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
