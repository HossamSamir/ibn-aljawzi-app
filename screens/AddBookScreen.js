import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Dimensions,
  Linking,
  Platform,
  Clipboard,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LoadingIndicator from '../components/LoadingIndicator';
import OneBookCard from '../components/OneBookCard';
import Server from '../constants/server';

export default class AddBook extends React.Component {

    constructor(props)
        {
          super(props);
          this.state = { books: [
                  {id: 0, book_name: 'Book1 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 1, book_name: 'Book2 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 2, book_name: 'Book3 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 3, book_name: 'Book4 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 4, book_name: 'Book5 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 5, book_name: 'Book6 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 6, book_name: 'Book7 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 7, book_name: 'Book8 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 8, book_name: 'Book9 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 9, book_name: 'Book10 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 10, book_name: 'Book11 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                  {id: 11, book_name: 'Book12 name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
              ],
              subCats: [
                  {id: 0, cat_name: 'Sub category 1'},
                  {id: 1, cat_name: 'Sub category 2'},
                  {id: 2, cat_name: 'Sub category 3'},
                  {id: 3, cat_name: 'Sub category 4'},
                  {id: 4, cat_name: 'Sub category 5'},
              ],
              thingsToTranslate:{NewBooks:'NewBooks'}
          }
        }
        componentDidMount ()
        {

            AsyncStorage.getItem("language").then((value) => {
              if (value == '1') {
                this.setState({ thingsToTranslate: {  NewBooks:'الكتب الجديدة' } })
              } else {
                this.setState({ thingsToTranslate: {  NewBooks:'New Books' } })
              }
            });
        }


  render() {

    return (
        <View>
        <Text style={{ marginHorizontal: 20, fontWeight: 'bold', color: '#555555', fontSize: 20, borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 10 }}>
        {this.state.thingsToTranslate.NewBooks}
        </Text>

          <FlatList
            style={{ flexDirection: 'column' }}
            contentContainerStyle={{ alignItems: 'center' ,}}
            numColumns={2}
            data = {this.state.books}
            keyExtractor={this._keyExtractor}
            renderItem = {({ item }) => (
                <View style={{ paddingVertical:10 }}>
                    <TouchableOpacity onPress={ () => {
                      this.props.navigation.navigate('Book', {
                          id: item.id,
                          book_photo: item.book_photo,
                          book_name: item.book_name,
                          author_name: item.author_name,
            //              cat_name: this.props.navigation.state.params.cat_name.toUpperCase()
                      })
                    }}>
                        <OneBookCard navigation={this.props.navigation}   id={item.id} horizontal={0} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
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
