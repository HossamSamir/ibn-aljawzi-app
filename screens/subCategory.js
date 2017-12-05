import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

//import Header from '../components/Header';
import OneBookCard from '../components/OneBookCard';

// API: send this.props.navigation.state.params.sub_cat_id to the server, and receive this.state.booksOfSubCat

export default class subCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                booksOfSubCat: [
                        {id: 0, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {id: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 1},
                        {id: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 2},
                        {id: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 3},
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
              data = {this.state.booksOfSubCat}
              keyExtractor={this._keyExtractor}
              renderItem = {({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity onPress={ () => {
                        this.props.navigation.navigate('Book', {book_ID: item.id})
                      }}>
                          <OneBookCard id={item.id} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
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
