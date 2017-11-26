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

import Header from '../components/Header';
import MyBookCard from '../components/MyBookCard';

export default class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainCats: [
                    {cat_ID: 0, cat_name: 'Top selling'},
                    {cat_ID: 1, cat_name: 'Trending'},
                    {cat_ID: 2, cat_name: 'Top selling'},
                    {cat_ID: 3, cat_name: 'Top selling'},
                    {cat_ID: 4, cat_name: 'Top selling'},
                ],
                recommended: [
                        {cat_ID: 0, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {cat_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 1},
                        {cat_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 2},
                        {cat_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 3},
                    ],
        }
    }
_keyExtractor = (item, index) => item.cat_ID;
  static navigationOptions = {
      header: <Header />
  };

  render() {
    return (
      <ScrollView style={styles.container}>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 80, }}
        data = {this.state.mainCats}
        keyExtractor={this._keyExtractor}
        renderItem = {({ item }) => (
            <TouchableOpacity onPress={ () => {
              this.props.navigation.navigate('Category', {})
            }}>
                <Text style={{ color: 'white', backgroundColor: '#106234', paddingVertical: 10, paddingHorizontal: 40, margin: 20, borderRadius: 18, fontSize: 12, fontWeight: 'bold' }}>{item.cat_name.toUpperCase()}</Text>
            </TouchableOpacity>
        )} />

        <FlatList
          style={{ flexDirection: 'column' }}
          data = {this.state.recommended}
          keyExtractor={this._keyExtractor}
          renderItem = {({ item }) => (
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity onPress={ () => {
                this.props.navigation.navigate('Book', {})
              }}>
                  <MyBookCard book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => {
                this.props.navigation.navigate('Book', {})
              }}>
                  <MyBookCard book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => {
                this.props.navigation.navigate('Book', {})
              }}>
                  <MyBookCard book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
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
