import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LoadingIndicator from '../components/LoadingIndicator';
import OneBookCard from '../components/OneBookCard';
import Server from '../constants/server';

// API: send this.props.navigation.state.params.searchingFor to the server and it should reply with this.state.result

export default class MyLibrary extends React.Component {
    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        fetch(Server.dest + '/api/searchfor?query='+this.props.navigation.state.params.searchingFor, {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {
            if(resJson.status == 1)
            {
                this.setState({foundResult: 1, result: resJson.result});
            }
            else
            {
                this.setState({foundResult: 0});
            }
        })
        .then(() => {
          this.setState({doneFetching: true})
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            doneFetching: false,
            foundResult: 0,
            result: [
                    /*{id: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 0},
                    {id: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 1},
                    {id: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 2},
                    {id: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 3},
                    {id: 4, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 4},
                    {id: 5, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 5},
                    {id: 6, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 6},
                    {id: 7, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 7},
                    {id: 8, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 8},
                */],
        }
    }
    _keyExtractor = (item, index) => item.id;

  static navigationOptions = {
      title: 'Search results'
  };

  render() {
      if(!this.state.doneFetching)
          return (<LoadingIndicator size="large" color="#B6E3C6" />);

        if(this.state.foundResult == 0)
        {
            return (
            <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#106234', fontSize: 22}}>Nothing found</Text>
            </View>);
        }
        else
        {
            return (
                <View style={styles.container}>
                    <Text style={{ color: '#333333', fontWeight: 'bold', padding: 9, backgroundColor: '#EEEEEE' }}>
                        Showing results for: <Text style={{ fontWeight: 'normal' }}>{this.props.navigation.state.params.searchingFor}</Text>
                    </Text>

                    <FlatList
                        style={{ flexDirection: 'column' }}
                        contentContainerStyle={{ alignItems: 'center' }}
                        numColumns={2}
                        data = {this.state.result}
                        keyExtractor={this._keyExtractor}
                        renderItem = {({ item }) => (
                            <View style={{  }}>
                                <TouchableOpacity onPress={ () => {
                                  this.props.navigation.navigate('Book', {
                                      book_ID: item.id,
                                      book_photo: item.book_photo,
                                      book_name: item.book_name,
                                      author_name: item.author_name,
                                      cat_name: item.cat_name
                                  })
                                }}>
                                    <OneBookCard navigation={this.props.navigation} id={item.id} horizontal={0} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                                </TouchableOpacity>
                            </View>
                        )} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
