import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Tab, Tabs, TabHeading } from 'native-base';
import MyHeader from '../components/Header';
import MapTab from '../components/MapTab';
import StoresListTab from '../components/StoresListTab';

export default class Stores extends React.Component {

  componentDidMount() {
    AsyncStorage.getItem("language").then((value) => {
      if (value == '1') {
        this.setState({ thingsToTranslate: { maps: 'خرائط', storesList: 'قائمة الفروع' } })
      } else {
        this.setState({ thingsToTranslate: { maps: 'Maps', storesList: 'Stores List' } })
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      thingsToTranslate: {
        maps: 'Maps',
        storesList: 'Stores List'
      },
    }
  }

  static navigationOptions = {
      header: <MyHeader />
  };

  render() {
    return (
        <Tabs initialPage={0}>
          <Tab heading = {
              <TabHeading>
                  <Ionicons
                    name='ios-list-outline'
                    size={28}
                    style={{ color: Platform.OS === 'ios' ? '#106234' : 'white', marginRight: 10 }}
                  />
                <Text style={{ color: Platform.OS === 'ios' ? '#106234' : 'white' }}>{this.state.thingsToTranslate.storesList}</Text>
              </TabHeading>
          }>
            <StoresListTab />
          </Tab>
          <Tab heading = {
              <TabHeading>
                  <Ionicons
                    name='ios-map'
                    size={28}
                    style={{ color: Platform.OS === 'ios' ? '#106234' : 'white', marginRight: 10 }}
                  />
                <Text style={{ color: Platform.OS === 'ios' ? '#106234' : 'white' }}>{this.state.thingsToTranslate.maps}</Text>
              </TabHeading>
          }>
            <MapTab />
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
