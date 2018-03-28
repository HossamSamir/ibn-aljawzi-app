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

export default class BookCard extends React.Component {
    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        fetch(Server.dest + '/api/similar_books?book_id='+this.props.navigation.state.params.book_ID,
        {headers: {'Cache-Control': 'no-cache'}})
        .then((res) => res.json())
        .then((resJson) => {
            if(resJson.status == 1) this.setState({similar_books: resJson.result });
            else this.setState({similar_books: null});
        })

        fetch(Server.dest + '/api/info_of_book?book_id='+this.props.navigation.state.params.book_ID,
        {headers: {'Cache-Control': 'no-cache'}}).
            then((res) => res.json()).then((resJson) => {
                this.setState({book_desc:  resJson[0]['descc'],
                    book_height: resJson[0]['height'],
                    book_width: resJson[0]['width'],
                    book_pagesnum: resJson[0]['pagesnum'],
                    book_binding: resJson[0]['binding'],
                });
            })
            .then(() => {
              //this.setState({doneFetches: (this.state.doneFetches+1)})
            });

        fetch(Server.dest + '/api/dllink_of_book?book_id='+this.props.navigation.state.params.book_ID, {headers: {'Cache-Control': 'no-cache'}}).
            then((res) => res.json()).then((resJson) => {
                this.setState({book_download:  resJson[0]['link']});
            })
            .then(() => {
              //this.setState({doneFetches: (this.state.doneFetches+1)})
            });
    }

    constructor(props) {
        super(props);
        this.state = {
            //doneFetches: 0,
            book_desc: "",
            book_height: 0,
            book_width: 0,
            book_pagesnum: 0,
            book_binding: "",
            book_download: "",
            similar_books: [],
            thingsToTranslate: {
              download: 'Download',
              links: 'Copy Link',
              favourite:'Favourite',
              falied:'Falied download',
              packing:'Packing',
              nopage:'Number of pages',
              width:'Width',
              length:'Length',
              related:'Related books',
              describtion:'Describtion'
            },
            //similarity_type: 0
        }
    }

    renderSeparator = () => {
        return (
            <View style={{ height:1, backgroundColor:'#EEEEEE' }}></View>
        )
    }

    _keyExtractor = (item, index) => item.id;

  render() {
    // if(this.state.doneFetches < 1)
    //     return (<LoadingIndicator size="large" color="#B6E3C6" />);

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={{ flexDirection: 'column', paddingHorizontal:10, backgroundColor:'transparent' }}>
                <View style={{flex: 1}}>
                    <OneBookCard navigation={this.props.navigation}
                        id={this.props.navigation.state.params.book_ID}
                        addButton={1}
                        horizontal={1}
                        book_name={this.props.navigation.state.params.book_name}
                        book_photo={this.props.navigation.state.params.book_photo}
                        author_name={this.props.navigation.state.params.author_name} />
                </View>

                {this.renderSeparator()}

                <View style={{ flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:15 }}>
                    <TouchableOpacity onPress={ ()=>{
                            if(this.state.book_download) Linking.openURL(this.state.book_download)
                            else {

                                    AsyncStorage.getItem("language").then((value) => {
                                      if (value == '1') {
                                    Alert.alert(
                                            'فشل فى التحميل',
                                        'هذا الكتاب غير متاح للتحميل',
                                          [
                                            {text: 'تم'},
                                          ],
                                          { cancelable: true })

                                      } else {
                                Alert.alert(
                                         'Failed download',
                                        'This book not avalible to download ',
                                        [
                                            {text:'Done'},
                                        ],
                                        {cancelable:true}
                                    )}
                                    });


                            }

                        }}
                        style={{ flex:1, flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons
                          name={Platform.OS === 'ios' ? 'ios-download' : 'md-download'}
                          size={29}
                          color={(this.state.book_download) ? 'black' : '#CCCCCC'}
                          style={{backgroundColor: 'transparent' }}
                        />
                        <Text style={{ color: (this.state.book_download) ? 'black' : '#CCCCCC',
                            backgroundColor: 'transparent', fontSize: 16, textAlign: 'center' }}>{this.state.thingsToTranslate.download}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ ()=>{
                            if(this.state.book_download) Clipboard.setString(this.state.book_download);
                            else {

                              AsyncStorage.getItem("language").then((value) => {
                                if (value == '1') {
                              Alert.alert(
                                  'فشل فى النسخ',
                                  'هذا الكتاب غير متاح للتحميل',
                                  [
                                    {text: 'تم'},
                                  ],
                                  { cancelable: true }

                        )    } else {
                          Alert.alert(
                                   'Failed copy',
                                  'This book not avalible to download',
                                  [
                                      {text:'Done'},
                                  ],
                                  {cancelable:true}
                              )}
                              });
                            }

                        }}
                        style={{ flex:1, flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons
                          name={Platform.OS === 'ios' ? 'ios-copy' : 'md-copy'}
                          size={29}
                          color={(this.state.book_download) ? 'black' : '#CCCCCC'}
                          style={{backgroundColor: 'transparent' }}
                        />
                        <Text style={{ color: (this.state.book_download) ? 'black' : '#CCCCCC',
                            backgroundColor: 'transparent', fontSize: 16, textAlign: 'center' }}>{this.state.thingsToTranslate.links}</Text>
                    </TouchableOpacity>
                </View>

                {this.renderSeparator()}

                <View
                    style={{ flex:1, flexDirection:'column', alignItems: 'center', justifyContent: 'center', paddingVertical:15}}>

                    <Ionicons
                      name='logo-buffer'
                      size={38}
                      color='#106234'
                      style={{backgroundColor: 'transparent' }}
                    />
                    <Text style={{ color: 'black',
                        backgroundColor: 'transparent', fontSize: 16, textAlign: 'center' }}>
                        {this.props.navigation.state.params.cat_name}
                    </Text>
                </View>

                {this.renderSeparator()}

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center', paddingVertical:15 }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
                        <Text style={{ color: 'black', fontSize: 16}}>{this.state.thingsToTranslate.length}</Text>
                        <Text style={{ color: '#AAAAAA', fontSize: 16}}>
                            {this.state.book_height}
                        </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
                        <Text style={{ color: 'black', fontSize: 16, textAlign:'center' }}>{this.state.thingsToTranslate.width}</Text>
                        <Text style={{ color: '#AAAAAA', fontSize: 16, textAlign:'center' }}>
                            {this.state.book_width}
                        </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
                        <Text style={{ color: 'black', fontSize: 16, textAlign:'center' }}>{this.state.thingsToTranslate.nopage}</Text>
                        <Text style={{ color: '#AAAAAA', fontSize: 16, textAlign:'center' }}>
                            {this.state.book_pagesnum}
                        </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
                        <Text style={{ color: 'black', fontSize: 16, textAlign:'center' }}>{this.state.thingsToTranslate.packing}</Text>
                        <Text style={{ color: '#AAAAAA', fontSize: 16, textAlign:'center' }}>
                            {this.state.book_binding}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ flex:1, backgroundColor:'#F2F2F2', paddingVertical:8, paddingHorizontal:5 }}>
                <View style={{ backgroundColor:'white', borderRadius:4, borderWidth:0.4, borderColor:'#EEEEEE' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#0E142A', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 22, padding: 10, paddingTop: 14 }}>
                        {this.state.thingsToTranslate.related}
                        </Text>
                    </View>

                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{  }}
                        data = {this.state.similar_books}
                        keyExtractor={this._keyExtractor}
                        renderItem = {({ item }) => (
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
                    )} />
                </View>
            </View>

            <View style={{ flex:1, backgroundColor:'white'}}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: '#0E142A', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 22, padding: 10, paddingTop: 14 }}>{this.state.thingsToTranslate.describtion}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: '#737481', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 16, padding: 12, textAlign: 'right'}}>
                        {this.state.book_desc}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
  }
}
