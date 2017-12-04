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
import MyBookCard from '../components/MyBookCard';

export default class MyLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [
                    {cat_ID: 0, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    {cat_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 1},
                    {cat_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 2},
                    {cat_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 3},
                    {cat_ID: 4, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 4},
                    {cat_ID: 5, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 5},
                    {cat_ID: 6, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 6},
                    {cat_ID: 7, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 7},
                    {cat_ID: 8, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 8},
                ],
        }
    }
    _keyExtractor = (item, index) => item.cat_ID;

  static navigationOptions = {
      title: 'Search results'
  };

  render() {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#333333', fontWeight: 'bold', padding: 9, backgroundColor: '#EEEEEE' }}>
                Showing results for: <Text style={{ fontWeight: 'normal' }}>{this.props.navigation.state.params.searchingFor}</Text>
            </Text>

            <FlatList
                style={{ flexDirection: 'column' }}
                numColumns={3}
                data = {this.state.result}
                keyExtractor={this._keyExtractor}
                renderItem = {({ item }) => (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={ () => {
                          this.props.navigation.navigate('Book', {})
                        }}>
                            <MyBookCard book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                        </TouchableOpacity>
                    </View>
                )} />
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
