import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//import Header from '../components/Header';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainCats: [
                {cat_ID: 0, cat_name: 'Top selling'},
                {cat_ID: 1, cat_name: 'Trending'},
                {cat_ID: 2, cat_name: 'Soulful'},
                {cat_ID: 3, cat_name: 'History'},
                {cat_ID: 4, cat_name: 'Entertainment'},
            ],
        }
    }
    _keyExtractor = (item, index) => item.cat_ID;

    /*static navigationOptions = {
        header: <Header />
    };*/

  render() {
    return (
        <View style={styles.container}>
            <FlatList
              style={{ flexDirection: 'column' }}
              numColumns={2}
              data = {this.state.mainCats}
              keyExtractor={this._keyExtractor}
              renderItem = {({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 13, marginHorizontal: 10 }}>
                      <TouchableOpacity onPress={ () => {this.props.navigation.navigate('Category', {})}}
                        style={{ flex: 1, flexDirection: 'row', backgroundColor: '#106234', paddingVertical: 12, paddingHorizontal: 10,  borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: 'white', borderRadius: 18, fontSize: 13, fontWeight: 'bold' }}>{item.cat_name.toUpperCase()}</Text>
                      </TouchableOpacity>
                  </View>
              )} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
});
