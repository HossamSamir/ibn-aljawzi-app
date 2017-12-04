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
import OneBookCard from '../components/OneBookCard';

export default class MyLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [
                    {id: 0, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    {id: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 1},
                    {id: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 2},
                    {id: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 3},
                    {id: 4, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 4},
                    {id: 5, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 5},
                    {id: 6, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 6},
                    {id: 7, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 7},
                    {id: 8, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 8},
                ],
        }
    }
    _keyExtractor = (item, index) => item.id;

    /*static navigationOptions = {
        header: <Header />
    };*/

  render() {
    return (
          <View style={styles.container}>
              <FlatList
                style={{ flexDirection: 'column' }}
                numColumns={3}
                data = {this.state.books}
                keyExtractor={this._keyExtractor}
                renderItem = {({ item }) => (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={ () => {
                          this.props.navigation.navigate('Book', {})
                        }}>
                            <OneBookCard id={item.id} addButton={0} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
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
