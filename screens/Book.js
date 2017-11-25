import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Alert,
  ListView,
  TextInput
} from 'react-native';
import { BlurView } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';

export default class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainCats: [
                    {cat_ID: 0, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    {cat_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 1},
                    {cat_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 2},
                    {cat_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 3},
                    {cat_ID: 4, book_name: 'Book name', book_photo: require('../assets/images/temp_books/5.jpeg'),  author_name: "Ahmed Hassan", author_ID: 4},
                    {cat_ID: 5, book_name: 'Book name', book_photo: require('../assets/images/temp_books/6.jpeg'),  author_name: "Ahmed Hassan", author_ID: 5},
                    {cat_ID: 6, book_name: 'Book name', book_photo: require('../assets/images/temp_books/7.jpeg'),  author_name: "Ahmed Hassan", author_ID: 6},
                ],
        }
    }
_keyExtractor = (item, index) => item.cat_ID;
static navigationOptions = {
    header: <Header />
};

  render() {
    return (
        <View>
            <Image blurRadius={10} source={require('../assets/images/temp_books/7.jpeg')} style={{ width: '100%', height: 360, position: 'absolute' }} />
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: 200, }}
              data = {this.state.mainCats}
              keyExtractor={this._keyExtractor}
              renderItem = {({ item }) => (
                  <Image source={item.book_photo}
                  style={{width: 130, height: 130, margin: 20, borderRadius: 10,}} />
              )} />
              <View style={{  flexDirection: 'row', height: 150, margin: 20,  }}>
                <View style={{ flex: .5,  }}>
                    <Image source={require('../assets/images/temp_books/7.jpeg')} style={{ width: '100%', height: '100%', borderRadius: 10, resizeMode: 'cover' }} />
                </View>
                <View style={{ flex: 1, paddingLeft: 15, }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23 }}>{'book name'.toUpperCase()}</Text>
                    <Text style={{ color: '#676667', fontWeight: 'bold', fontSize: 15 }}>Ropert bally</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 8, }}>
                    <Ionicons
                      name='ios-pricetag-outline'
                      size={23}
                      color='white'
                      style={{backgroundColor: 'transparent', marginRight: 10,  }}
                    />
                    Horror</Text>
                    <TouchableOpacity style={{ backgroundColor: '#1CAE4D', borderRadius: 10, marginVertical: 25, maxWidth: 130,  }}>
                        <Text style={{ color: 'white', padding: 10, fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>BUY 10.99$</Text>
                    </TouchableOpacity>
                </View>
              </View>
        </View>
    );
  }
}
