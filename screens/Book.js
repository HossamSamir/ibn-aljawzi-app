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
  Dimensions,
  AsyncStorage,
  Linking
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
        fetch(Server.dest + '/api/screenshots_of_book?book_id='+this.props.navigation.state.params.book_ID).
            then((res) => res.json()).then((resJson) => {
                this.setState({screenshots: resJson});
            })
            .then(() => {
              this.setState({doneFetches: (this.state.doneFetches+1)})
            }).catch(error => {
                console.error(error);
            Alert.alert('screenshots',JSON.stringify(error),[{text: 'Ask me later'} ])
          });

        fetch(Server.dest + '/api/comments_of_book?book_id='+this.props.navigation.state.params.book_ID).
            then((res) => res.json()).then((resJson) => {
                this.setState({comments: resJson});
            })
            .then(() => {
              this.setState({doneFetches: (this.state.doneFetches+1)})
            }).catch(error => {
                console.error(error);
            Alert.alert('comments',JSON.stringify(error),[{text: 'Ask me later'} ])
          });

        fetch(Server.dest + '/api/desc_of_book?book_id='+this.props.navigation.state.params.book_ID).
            then((res) => res.json()).then((resJson) => {
                this.setState({book_desc:  resJson[0]['descc']});
            })
            .then(() => {
              //this.setState({doneFetches: (this.state.doneFetches+1)})
            }).catch(error => {
                console.error(error);
            Alert.alert('descc',JSON.stringify(error),[{text: 'Ask me later'} ])
          });

        fetch(Server.dest + '/api/dllink_of_book?book_id='+this.props.navigation.state.params.book_ID).
            then((res) => res.json()).then((resJson) => {
                this.setState({book_download:  resJson[0]['link']});
            })
            .then(() => {
              //this.setState({doneFetches: (this.state.doneFetches+1)})
            }).catch(error => {
                console.error(error);
            Alert.alert('link',JSON.stringify(error),[{text: 'Ask me later'} ])
          });
    }

    constructor(props) {
        super(props);
        this.state = {
            myComment: '',
            doneFetches: 0,
            book_desc: "",
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
            comments: [
                    /*{username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....'},
                    {username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....'},
                    {username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....'},
                    {username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....'},
                    {username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....'},
                    {username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....'},
                    {username: 'Hossam Samir', comment: 'Great book I highly recomend reading it....'},*/
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
                <View>
                    <Text style={{ color: '#0E142A', backgroundColor: '#E5E5E5', fontWeight: 'bold', fontSize: 22, padding: 10, paddingTop: 32}}>Description</Text>
                    <Text style={{ color: '#737481', backgroundColor: '#fff', fontWeight: 'bold', fontSize: 16, padding: 12, marginTop: 10}}>
                        {this.state.book_desc}
                    </Text>
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

    addComment = () => {
        if(this.state.myComment.length > 0)
        {
            AsyncStorage.getItem('login').then(
                (logged) => {
                    if(logged == '1')
                    {
                        AsyncStorage.getItem('userid').then(
                            (userid) => {
                                fetch(`${Server.dest}/api/add_comment?user_id=${userid}&comment=${this.state.myComment}&book_id=${this.props.navigation.state.params.book_ID}`).
                                    then((res) => res.json()).then((resJson) => {
                                    if(resJson.status == 1)
                                    {
                                        var arr = this.state.comments;
                                        arr.unshift({ id: resJson.id, username: resJson.username, comment: this.state.myComment});
                                        this.setState({ comments: arr });
                                        this.setState({myComment: ''});
                                    }
                                });
                            }
                        );
                    }
                    else
                    {
                        Alert.alert(
                          'Cannot comment',
                          'Cannot comment because you are not logged in',
                          [
                            {text: 'Okay'},
                          ],
                          { cancelable: true }
                      );
                    }
                }
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
        <ScrollView style={{backgroundColor: '#E5E5E5'}}>
            <Image blurRadius={10} source={{uri: this.props.navigation.state.params.book_photo}} style={{ width: '100%', height: 430, position: 'absolute' }} />

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

              <Image source={require('../assets/images/curve.png')} style={{ width: '100%', height: 100, marginTop: 15}} />

              <View style={{backgroundColor: 'white'}}>
                <OneBookCard
                    navigation={this.props.navigation}
                    id={this.props.navigation.state.params.book_ID}
                    addButton={1}
                    book_name={this.props.navigation.state.params.book_name}
                    book_photo={this.props.navigation.state.params.book_photo}
                    author_name={this.props.navigation.state.params.author_name} />

                {this.shouldRenderDownloadButton()}
              </View>

              {this.shouldRenderBookDesc()}
              <Text style={{ color: '#0E142A', backgroundColor: '#E5E5E5', fontWeight: 'bold', fontSize: 22, marginTop:0, padding: 10, paddingTop: 32}}>Comments</Text>

              <View style={{ width: '100%', flexDirection: 'row', padding: 12, backgroundColor: '#fff'}}>
                <TextInput
                    value={this.state.myComment}
                    onChangeText={(text) => this.setState({myComment:text})}
                    onSubmitEditing={(event) => this.addComment() }
                    underlineColorAndroid='transparent' placeholderTextColor='#858788' placeholder='Write a comment here...' style={{ flex: 1 }} />
                <TouchableOpacity
                    onPress={() => {
                        this.addComment()
                    }}
                    style={{ flex: .5, paddingVertical: 10, paddingHorizontal: 16, marginHorizontal: 30, borderRadius: 5, flexDirection: 'row', backgroundColor: '#E16626', alignItems: 'center', justifyContent: 'center' }}>
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
