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
  TextInput,
  Dimensions
} from 'react-native';
import { BlurView } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Lightbox from 'react-native-lightbox';

import Header from '../components/Header';

export default class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenshots: [
                    {Book_ID: 0, book_photo: require('../assets/images/temp_books/1.jpeg'),  author_name: "Ahmed Hassan", author_ID: 0},
                    {Book_ID: 1, book_photo: require('../assets/images/temp_books/2.jpeg'),  author_name: "Ahmed Hassan", author_ID: 1},
                    {Book_ID: 2, book_photo: require('../assets/images/temp_books/3.jpeg'),  author_name: "Ahmed Hassan", author_ID: 2},
                    {Book_ID: 3, book_photo: require('../assets/images/temp_books/4.jpeg'),  author_name: "Ahmed Hassan", author_ID: 3},
                    {Book_ID: 4, book_photo: require('../assets/images/temp_books/5.jpeg'),  author_name: "Ahmed Hassan", author_ID: 4},
                    {Book_ID: 5, book_photo: require('../assets/images/temp_books/6.jpeg'),  author_name: "Ahmed Hassan", author_ID: 5},
                    {Book_ID: 6, book_photo: require('../assets/images/temp_books/7.jpeg'),  author_name: "Ahmed Hassan", author_ID: 6},
                ],
            comments: [
                    {comment_ID: 0,  user_ID: 0, username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....', rate: 4},
                    {comment_ID: 1,  user_ID: 1, username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....', rate: 4},
                    {comment_ID: 2,  user_ID: 2, username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....', rate: 4},
                    {comment_ID: 3,  user_ID: 3, username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....', rate: 4},
                    {comment_ID: 4,  user_ID: 4, username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....', rate: 4},
                    {comment_ID: 5,  user_ID: 5, username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....', rate: 4},
                    {comment_ID: 6,  user_ID: 6, username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....', rate: 4},
                ],
        }
    }
_keyExtractor = (item, index) => item.Book_ID;
_keyExtractor2 = (item, index) => item.comment_ID;
/*static navigationOptions = {
    header: <Header />
};*/

  render() {
    return (
        <ScrollView>
            <Image blurRadius={10} source={require('../assets/images/temp_books/7.jpeg')} style={{ width: '100%', height: 430, position: 'absolute', }} />
            <Image source={require('../assets/images/curve.png')} style={{ width: '100%', height: 100, position: 'absolute', top: 370}} />

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: 200, }}
              data = {this.state.screenshots}
              keyExtractor={this._keyExtractor}
              renderItem = {({ item }) => (
                  <Lightbox
                        renderContent={ () => {
                            return (
                                <Image source={item.book_photo}
                                resizeMode='contain'
                                style={{width: null, resizeMode: 'contain', height: Dimensions.get('window').height, borderRadius: 10,}} />
                            );
                        }}>
                      <Image source={item.book_photo}
                      resizeMode='contain'
                      style={{width: 140, height: 140, margin: 20, borderRadius: 10,}} />
                  </Lightbox>
              )} />
              <View style={{  flexDirection: 'row', height: 150, margin: 20, }}>
                <View style={{ flex: .5,  }}>
                    <Image source={require('../assets/images/temp_books/7.jpeg')} style={{ width: '100%', height: '100%', borderRadius: 10, resizeMode: 'cover' }} />
                </View>
                <View style={{ flex: 1, paddingLeft: 15, }}>
                    <Text style={{ color: 'white', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 23 }}>{'book name'.toUpperCase()}</Text>
                    <Text style={{ color: '#676667', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 15 }}>Ropert bally</Text>
                    <Text style={{ color: 'white', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 16, marginTop: 8, }}>
                    <Ionicons
                      name='ios-pricetag-outline'
                      size={23}
                      color='white'
                      style={{backgroundColor: 'transparent',  }}
                    />{'  Horror'}</Text>
                    <TouchableOpacity onPress={ () => {
                        this.props.navigation.navigate('Payment', {})
                    }} style={{ backgroundColor: '#1CAE4D', borderRadius: 10, marginVertical: 25, maxWidth: 130,  }}>
                        <Text style={{ color: 'white', backgroundColor: 'transparent', padding: 10, fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>BUY 10.99$</Text>
                    </TouchableOpacity>
                </View>
              </View>
              <Text style={{ color: '#0E142A', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 18, margin: 12, marginTop: 20}}>Description</Text>
              <Text style={{ color: '#737481', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 16, padding: 12, marginTop: 10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</Text>

              <Text style={{ color: '#0E142A', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 18, padding: 12, }}>Reviews</Text>

              <View style={{ width: '100%', flexDirection: 'row', padding: 12, backgroundColor: '#fff'}}>
                <TextInput underlineColorAndroid='transparent' placeholderTextColor='#858788' placeholder='Write a comment here...' style={{ flex: 1 }} />
                <TouchableOpacity style={{ flex: .5, paddingVertical: 10, paddingHorizontal: 16, marginHorizontal: 30, borderRadius: 5, flexDirection: 'row', backgroundColor: '#E16626', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons
                      name='ios-chatboxes-outline'
                      size={30}
                      color='white'
                      style={{backgroundColor: 'transparent', marginRight: 8 }}
                    />
                    <Text style={{ color: 'white' }}>Comment</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                style={{ backgroundColor: '#fff' }}
                data = {this.state.comments}
                keyExtractor={this._keyExtractor2}
                renderItem = {({ item }) => (
                    <View style={{ marginVertical: 18}}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ backgroundColor: 'transparent', marginHorizontal: 12, fontWeight: 'bold', fontSize: 14, flex: .4 }}>{item.username}</Text>
                        </View>
                        <Text style={{ marginHorizontal: 12, paddingBottom: 12 }}>{ item.comment }</Text>
                    </View>
                )} />

        </ScrollView>
    );
  }
}
