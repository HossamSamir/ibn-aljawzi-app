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

// API: send this.props.navigation.state.params.main_cat_id to the server, get this.state.subCats and this.state.books of that main category

export default class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subCats: [
                {id: 0, cat_name: 'Sub category 1'},
                {id: 1, cat_name: 'Sub category 2'},
                {id: 2, cat_name: 'Sub category 3'},
                {id: 3, cat_name: 'Sub category 4'},
                {id: 4, cat_name: 'Sub category 5'},
            ],
            books: [
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
      <ScrollView style={styles.container}>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 80, }}
        data = {this.state.subCats}
        keyExtractor={this._keyExtractor}
        renderItem = {({ item }) => (
            <TouchableOpacity onPress={ () => {
              this.props.navigation.navigate('subCategory', {sub_cat_id: item.id})
            }}>
                <Text style={{ color: 'white', backgroundColor: '#106234', paddingVertical: 10, paddingHorizontal: 40, margin: 20, borderRadius: 18, fontSize: 12, fontWeight: 'bold' }}>{item.cat_name.toUpperCase()}</Text>
            </TouchableOpacity>
        )} />

        <FlatList
          style={{ flexDirection: 'column' }}
          numColumns={3}
          data = {this.state.books}
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

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
