import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Dimensions,
  Linking,
  ImageBackground
} from 'react-native';
import { BlurView } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Lightbox from 'react-native-lightbox';

//import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import OneBookCard from '../components/OneBookCard';
import Server from '../constants/server';

// API: send this.props.navigation.state.params.book_ID to the server

export default class BookCard extends React.Component {
    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        fetch(Server.dest + '/api/screenshots_of_book?book_id='+this.props.navigation.state.params.book_ID, {headers: {'Cache-Control': 'no-cache'}}).
            then((res) => res.json()).then((resJson) => {
                var arr = resJson;
                arr.unshift({ id: -1, book_photo: this.props.navigation.state.params.book_photo });
                this.setState({ screenshots: arr });
            })
            .then(() => {
              this.setState({doneFetches: (this.state.doneFetches+1)})
            });

        fetch(Server.dest + '/api/comments_of_book?book_id='+this.props.navigation.state.params.book_ID, {headers: {'Cache-Control': 'no-cache'}}).
            then((res) => res.json()).then((resJson) => {
                this.setState({comments: resJson});
            })
            .then(() => {
              this.setState({doneFetches: (this.state.doneFetches+1)})
            });

        fetch(Server.dest + '/api/info_of_book?book_id='+this.props.navigation.state.params.book_ID, {headers: {'Cache-Control': 'no-cache'}}).
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
            myComment: '',
            doneFetches: 0,
            book_desc: "",
            book_height: 0,
            book_width: 0,
            book_pagesnum: 0,
            book_binding: "",
            book_download: "",
            screenshots: [
                    /*{book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg'},
                    {book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg'},
                    {book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg'},
                    {book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg'},
                    {book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg'},
                    {book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg'},
                    {book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg'},*/
                ],
        }
    }

    shouldRenderBookDesc = () => {
        if(this.state.book_desc == "")
        {
            return null;
        }
        else
        {
            return (
                <View style={{backgroundColor:'white'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#0E142A', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 22, padding: 10, paddingTop: 14,
                            alignSelf: 'center'}}>Description</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: '#737481', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 16, padding: 12}}>
                            {this.state.book_desc}
                        </Text>
                    </View>
                </View>
            );
        }
    };

    shouldRenderDownloadButton = () => {
        if(this.state.book_download == "")
        {
            return null;
        }
        else
        {
            return (
                <TouchableOpacity onPress={ ()=>{ Linking.openURL(this.state.book_download)}}
                    style={{ flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2C7A37', borderRadius: 10, margin: 9, padding: 6}}>
                    <Ionicons
                      name='md-download'
                      size={25}
                      color='white'
                      style={{backgroundColor: 'transparent', marginRight: 8 }}
                    />
                    <Text style={{ color: 'white', backgroundColor: 'transparent', padding: 10, fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Download</Text>
                </TouchableOpacity>
            );
        }
    };

_keyExtractor = (item, index) => item.id;
_keyExtractor2 = (item, index) => item.id;
/*static navigationOptions = {
    header: <Header />
};*/

  render() {
    if(this.state.doneFetches < 2)
        return (<LoadingIndicator size="large" color="#B6E3C6" />);

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{ flexDirection: 'column' }}>
            <ImageBackground blurRadius={8} source={{uri: this.props.navigation.state.params.book_photo}} style={{ flex: 1, height: (Dimensions.get('window').height*0.65)}}>


            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{flex: 0.95, flexDirection: 'row', justifyContent: 'center', marginTop:5, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 13 }}>
                  <OneBookCard
                      navigation={this.props.navigation}
                      id={this.props.navigation.state.params.book_ID}
                      addButton={1}
                      horizontal={1}
                      book_name={this.props.navigation.state.params.book_name}
                      book_photo={this.props.navigation.state.params.book_photo}
                      author_name={this.props.navigation.state.params.author_name} />
              </View>
            </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{flex: 1}}
                data = {this.state.screenshots}
                keyExtractor={this._keyExtractor}
                renderItem = {({ item }) => (
                    <Lightbox
                          renderContent={ () => {
                              return (
                                  <Image source={{uri: item.book_photo}}
                                  resizeMode='contain'
                                  style={{width: null, resizeMode: 'contain', height: Dimensions.get('window').height, borderRadius: 10,}} />
                              );
                          }}>
                        <Image source={{uri: item.book_photo}}
                        resizeMode='contain'
                        style={{width: 140, height: 140, margin: 20, borderRadius: 10 }} />
                    </Lightbox>
                )} />

                </ImageBackground>



              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 9 }}>
                  <Text style={{ color: '#737481', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 16}}>Book height: {this.state.book_height}</Text>
                  <Text style={{ color: '#737481', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 16}}>Book width: {this.state.book_width}</Text>
                  <Text style={{ color: '#737481', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 16}}>Book binding: {this.state.book_binding}</Text>
                  <Text style={{ color: '#737481', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 16}}>Number of pages: {this.state.book_pagesnum}</Text>
              </View>

              <View style={{flex: 1, backgroundColor: 'white'}}>
                {this.shouldRenderDownloadButton()}
              </View>

              {this.shouldRenderBookDesc()}
            </View>
        </ScrollView>
    );
  }
}
