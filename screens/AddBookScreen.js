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
    doTheFetching() {
        fetch(Server.dest + '/api/new_books', {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {
            this.setState({books: resJson});
        })
        .then(() => {
          this.setState({doneFetching: true})
        })
    }
    constructor(props)
        {
          super(props);
          this.state = {
              doneFetching:false,
              books: [],
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
              this.doTheFetching();
            });
        }
  render() {

    return (
        <View>
        <View style={{borderBottomWidth:0.7,borderBottomColor:'#555555',paddingTop:10}}>
        <Text style={{ marginHorizontal: 20, fontWeight: 'bold', color: '#555555', fontSize: 20, borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 10 }}>
        {this.state.thingsToTranslate.NewBooks}
        </Text>
        </View>
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
