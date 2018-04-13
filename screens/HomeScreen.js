import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import Carousel from 'react-native-carousel-view';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

//import Header from '../components/Header';
import OneBookCard from '../components/OneBookCard';
import LoadingIndicator from '../components/LoadingIndicator';
import Server from '../constants/server';

export default class HomeScreen extends React.Component {
    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        fetch(Server.dest + '/api/categories', {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {
            this.setState({mainCats: resJson});
        })
        .then(() => {
          this.setState({doneFetches: (this.state.doneFetches+1)})
        })

        fetch(Server.dest + '/api/homescreen', {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJsontwo) => {
            this.setState({booksInCats: resJsontwo});
        })
        .then(() => {
          this.setState({doneFetches: (this.state.doneFetches+1)})
      }).catch(error => {
          console.error(error);
      Alert.alert('Connection failure', "Please check your connection",[{text: 'Okay'} ])
    });


    }

    constructor(props) {
        super(props);
        this.state = {
            doneFetches: 0,
            mainCats: [
                /*{id: 0, name: 'Top selling'},
                {id: 1, name: 'Trending'},
                {id: 2, name: 'Soulful'},
                {id: 3, name: 'History'},
                {id: 4, name: 'Entertainment'},*/
            ],
            booksInCats: [
                /*{
                    cat_ID: 1, cat_name: "Top selling",
                    cat_books: [
                        {book_ID: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 4, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 6, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 7, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                    ]
                },
                {
                    cat_ID: 1, cat_name: "Trending",
                    cat_books: [
                        {book_ID: 4, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 6, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 6, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                    ]
                },
                {
                    cat_ID: 2, cat_name: "Soulful",
                    cat_books: [
                        {book_ID: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 5, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 5, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 6, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 7, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                    ]
                },
                {
                    cat_ID: 3, cat_name: "History",
                    cat_books: [
                        {book_ID: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 4, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 6, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 7, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                    ]
                },
                {
                    cat_ID: 4, cat_name: "Entertainment",
                    cat_books: [
                        {book_ID: 5, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 4, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                        {book_ID: 7, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan"},
                    ]
                },*/
            ],
            AdsText:{
            AdText1:'هذه المساحة من الصفحة خاصة بإعلان صادر من إدارة التطبيق',
            AdText2:'هذه المساحة من الصفحة خاصة بإعلان صادر من إدارة التطبيق',
            AdText3:'هذه المساحة من الصفحة خاصة بإعلان صادر من إدارة التطبيق',
        },
        }
    }

_keyExtractor0 = (item, index) => item.id;
_keyExtractor = (item, index) => item.cat_ID;
_keyExtractor2 = (item, index) => item.book_ID;

    renderHeader = () => {
        return (

            <View style ={{flex:1,flexDirection:'column',alignItems:'center'}}>

            <Carousel width={280} height={150} delay={3500} indicatorSize={10} indicatorColor='#106234' >
            <View style={{flex:1,width:280,height:40}}>
                <Text>{this.state.AdsText.AdText1}</Text>
            </View>
            <View style={{flex:1,width:280,height:40}}>
                <Text>{this.state.AdsText.AdText2}</Text>
            </View>
            <View style={{flex:1,width:280,height:40}}>
                <Text>{this.state.AdsText.AdText3}</Text>
            </View>
            </Carousel>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: 80,height:130}}
              data = {this.state.mainCats}
              keyExtractor={this._keyExtractor0}
              renderItem = {({ item }) => (
                  <TouchableOpacity onPress={ () => {
                    this.props.navigation.navigate('Category', {main_cat_id: item.id, cat_name: item.name})
                  }}>
                      <Text style={{ color: 'white', backgroundColor: '#106234', paddingVertical: 10, paddingHorizontal: 40, margin: 20, borderRadius: 18, fontSize: 12, fontWeight: 'bold' }}>{item.name.toUpperCase()}</Text>
                  </TouchableOpacity>
              )} />
              </View>

        );
    }

  /*static navigationOptions = {
      header: <Header />
  };*/
  //navigationOptions = (navigation) => {header: <Header nav={navigation} />};

  render() {
      if(this.state.doneFetches < 2)
          return (<LoadingIndicator size="large" color="#B6E3C6" />);

    return (


        <FlatList
            style={{ flexDirection: 'column', backgroundColor: 'white' }}
            data = {this.state.booksInCats}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={() => this.renderHeader()}
            renderItem = {({ item }) => {
                if(item.cat_books.length > 0)
                {
                    let category_name = item.cat_name;
                    return (
                        <View style={{marginBottom:22}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                              <TouchableOpacity style={{ flexDirection: 'row'}} onPress={ () => {
                                  this.props.navigation.navigate('Category', {main_cat_id: item.cat_ID, cat_name: item.cat_name})
                                }}>
                                <Text style={{ marginLeft: 20, fontWeight: 'bold', color: '#555555', fontSize: 20 }}>
                                    {item.cat_name.toUpperCase()}
                                </Text>

                                    <Ionicons
                                      name='ios-arrow-dropright-circle-outline'
                                      size={24}
                                      color='#106234'
                                      style={{marginLeft:10, padding:0, backgroundColor: 'transparent' }}/>
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
                                          this.props.navigation.navigate('Book', {
                                              book_ID: item.book_ID,
                                              book_photo: item.book_photo,
                                              book_name: item.book_name,
                                              author_name: item.author_name,
                                              cat_name: category_name
                                          })
                                        }}>
                                          <OneBookCard navigation={this.props.navigation}   id={item.book_ID} horizontal={0} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                                        </TouchableOpacity>
                                )} />
                            </View>
                        </View>
                    );
                }
          }} />
    );
  }
}
