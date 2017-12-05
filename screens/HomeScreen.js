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

export default class HomeScreen extends React.Component {

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
            booksInCats: [
                {
                    cat_ID: 0, cat_name: "Top selling",
                    cat_books: [
                        {book_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 4, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 6, book_name: 'Book name', book_photo: require('../assets/images/temp_books/6.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 7, book_name: 'Book name', book_photo: require('../assets/images/temp_books/7.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    ]
                },
                {
                    cat_ID: 1, cat_name: "Trending",
                    cat_books: [
                        {book_ID: 4, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 6, book_name: 'Book name', book_photo: require('../assets/images/temp_books/6.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 6, book_name: 'Book name', book_photo: require('../assets/images/temp_books/6.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    ]
                },
                {
                    cat_ID: 2, cat_name: "Soulful",
                    cat_books: [
                        {book_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 5, book_name: 'Book name', book_photo: require('../assets/images/temp_books/5.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 5, book_name: 'Book name', book_photo: require('../assets/images/temp_books/5.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 6, book_name: 'Book name', book_photo: require('../assets/images/temp_books/6.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 7, book_name: 'Book name', book_photo: require('../assets/images/temp_books/7.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    ]
                },
                {
                    cat_ID: 3, cat_name: "History",
                    cat_books: [
                        {book_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 4, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 6, book_name: 'Book name', book_photo: require('../assets/images/temp_books/6.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 7, book_name: 'Book name', book_photo: require('../assets/images/temp_books/7.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    ]
                },
                {
                    cat_ID: 4, cat_name: "Entertainment",
                    cat_books: [
                        {book_ID: 5, book_name: 'Book name', book_photo: require('../assets/images/temp_books/5.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 3, book_name: 'Book name', book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 4, book_name: 'Book name', book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 1, book_name: 'Book name', book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 2, book_name: 'Book name', book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                        {book_ID: 7, book_name: 'Book name', book_photo: require('../assets/images/temp_books/7.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    ]
                },
                ],
        }
    }
_keyExtractor = (item, index) => item.cat_ID;
_keyExtractor2 = (item, index) => item.book_ID;

  /*static navigationOptions = {
      header: <Header />
  };*/
  //navigationOptions = (navigation) => {header: <Header nav={navigation} />};

  render() {
    return (
      <ScrollView style={styles.container}>
      <ImageBackground
          source={require('../assets/images/bg.png')}
          style={{
              flex: 1
          }}>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 80, }}
        data = {this.state.mainCats}
        keyExtractor={this._keyExtractor}
        renderItem = {({ item }) => (
            <TouchableOpacity onPress={ () => {
              this.props.navigation.navigate('Category', {main_cat_id: item.cat_ID})
            }}>
                <Text style={{ color: 'white', backgroundColor: '#106234', paddingVertical: 10, paddingHorizontal: 40, margin: 20, borderRadius: 18, fontSize: 12, fontWeight: 'bold' }}>{item.cat_name.toUpperCase()}</Text>
            </TouchableOpacity>
        )} />

        <FlatList
            style={{ flexDirection: 'column' }}
            data = {this.state.booksInCats}
            keyExtractor={this._keyExtractor}
            renderItem = {({ item }) => (
            <View style={{marginBottom:22}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{ marginLeft: 20, fontWeight: 'bold', color: '#555555', fontSize: 20 }}>
                        {item.cat_name.toUpperCase()}
                    </Text>

                    <TouchableOpacity onPress={ () => {
                      this.props.navigation.navigate('Category', {main_cat_id: item.cat_ID})
                    }}>
                        <Ionicons
                          name='ios-arrow-dropright-circle-outline'
                          size={24}
                          color='#106234'
                          style={{marginLeft:10, padding:0, backgroundColor: 'transparent',  }}/>
                    </TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{  }}
                        data = {item.cat_books}
                        keyExtractor={this._keyExtractor2}
                        renderItem = {({ item }) => (
                            <TouchableOpacity onPress={ () => {
                              this.props.navigation.navigate('Book', {book_ID: item.book_ID})
                            }}>
                              <OneBookCard id={item.book_ID} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                            </TouchableOpacity>
                    )} />
                </View>
            </View>
          )} />

        </ImageBackground>
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
