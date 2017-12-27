import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class StoresListTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storesInfo: [
            {
                ID: 0,
                name: 'فرع الدمام - طريق الملك فهد - المملكة العربية السعودية',
                phone: 1234567,
                fax: 8412100,
                postalCode: 32253
            },
            {
                ID: 0,
                name: 'فرع الدمام - طريق الملك فهد - المملكة العربية السعودية',
                phone: 1234567,
                fax: 8412100,
                postalCode: 32253
            },
            {
                ID: 0,
                name: 'فرع الدمام - طريق الملك فهد - المملكة العربية السعودية',
                phone: 1234567,
                fax: 8412100,
                postalCode: 32253
            },
            ]
        }
    }
    _keyExtractor = (store, index) => store.ID;
  render() {
    return (
        <FlatList
          data={this.state.storesInfo}
          renderItem={({item}) =>
            <View style={{ marginVertical: 20, marginHorizontal: 30 }}>

                <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', color: '#106234' }}>
                    {item.name}
                </Text>

                <Text style={{textAlign: 'right', marginVertical: 8, }}>
                    {item.phone + ' :'}
                    <Ionicons
                      name='ios-phone-portrait-outline'
                      size={28}
                      style={{ color: '#106234', }}
                    />
                </Text>

                <Text style={{textAlign: 'right', marginVertical: 8, }}>
                    {item.fax + ' :'}
                    <Ionicons
                      name='ios-calculator-outline'
                      size={28}
                      style={{ color: '#106234', }}
                    />
                </Text>

                <Text style={{textAlign: 'right', marginVertical: 8, }}>
                    {item.postalCode + ' :'}
                    <Ionicons
                      name='ios-mail-outline'
                      size={28}
                      style={{ color: '#106234', }}
                    />
                </Text>

            </View>
         }
          keyExtractor={this._keyExtractor}
        />
    );
  }
}
