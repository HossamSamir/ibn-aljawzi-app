import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Server from '../constants/server';
import Lightbox from 'react-native-lightbox';

export default class OneBookCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            added: 0,
            //addButtonText: 'مُفضل',
            addButtonIcon: 'ios-star-outline',
            addButtonBGCol: '#106234',
            book_price: 0,
            book_discount: 0,
            price_text: 'ر.س',
            thingsToTranslate: {
            favourite:'Favourite'}
        }
    }

    componentDidMount ()
    {

        AsyncStorage.getItem("language").then((value) => {
          if (value == '1') {
            this.setState({ thingsToTranslate: {  favourite:'مُفضل' } })
          } else {
            this.setState({ thingsToTranslate: {  favourite:'Favourite' } })
          }
        });


        if(this.props.addButton == 1)
        {
            this.isBookInLibrary((result) => {
                if(result == 1)
                {
                    this.setState({
                        added: 1,
                        //addButtonText: 'مُفضل',
                        addButtonIcon: 'ios-checkmark-circle-outline',
                        addButtonBGCol: '#cccccc'
                    });
                }
                else
                {
                    this.setState({
                        added: 0,
                    //    addButtonText: 'مُفضل',
                        addButtonIcon: 'ios-star-outline',
                        addButtonBGCol: '#106234'
                    });
                }
            });
        }

        AsyncStorage.getItem('currency').then(
            (value) => {
                var convert = 0;
                if(value == '0')
                {
                    convert = 1;
                    this.setState({price_text: 'USD'});
                }
                else
                    this.setState({price_text: 'ريال سعودى'});

                fetch(Server.dest + '/api/price_of_book?book_id='+this.props.id+'&convert='+convert, {headers: {'Cache-Control': 'no-cache'}}).
                    then((res) => res.json()).then((resJson) => {
                        this.setState({book_price: resJson.price, book_discount: resJson.discount});
                    });
            }
        );
    }

    asyncAddBookToLibrary = (callback) => {
        AsyncStorage.getItem('MyLibraryBooksIDs').then(
            (value) => {
                if(value !== null && value !== undefined)
                {
                    callback(value);
                }
                else
                {
                    callback(null);
                }
            }
        );
    };

    addBook_AsyncStorage = (status, data) => {
        AsyncStorage.setItem('justAddedBook', '1');

        this.setState({
            added: 1,
            //addButtonText: 'مُفضل',
            addButtonIcon: 'ios-checkmark-circle-outline',
            addButtonBGCol: '#cccccc'
        });

        if(status == 0)
        {
            var newData = data.concat("," + String(this.props.id));
            AsyncStorage.setItem('MyLibraryBooksIDs', newData);
        }
        else if(status == -1)
        {
            // empty library, just add it without commas
            AsyncStorage.setItem('MyLibraryBooksIDs', String(this.props.id));
        }
    }

    addBookToLibrary = () => {
        AsyncStorage.getItem('login').then(
            (logged) => {
                this.isBookInLibrary((status, data) => {
                    if(status == 1)
                    {
                        return;
                    }
                    else
                    {
                        if(logged == '1')
                        {
                            AsyncStorage.getItem('userid').then(
                                (userid) => {

                                    fetch(Server.dest + '/api/add-my-library?user_id='+userid+'&book_id='+this.props.id, {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {
                                        if(resJson.reply == 1)
                                        {
                                            this.addBook_AsyncStorage(status, data);
                                        }
                                        else
                                        {
                                            Alert.alert(
                                              'Network failure',
                                              'Failed to add this book to your library',
                                              [
                                                {text: 'Okay'},
                                              ],
                                              { cancelable: true }
                                            )
                                        }
                                    });
                                }
                            );
                        }
                        else
                            this.addBook_AsyncStorage(status, data);
                    }
                });
            }
        );
    };

    isBookInLibrary = (callback) => {
        AsyncStorage.getItem('MyLibraryBooksIDs').then(
            (value) => {
                if(value !== null && value !== undefined)
                {
                    if(value.length > 0)
                    {
                        if(!value.includes(","))
                        {
                            if(parseInt(value) == this.props.id)
                            {
                                callback(1, value)
                            }
                            else
                            {
                                callback(0, value);
                            }
                        }
                        else
                        {
                            var ret = 0;
                            var booksArr = value.split(",");
                            booksArr.map((bookID) => {
                                if(bookID == this.props.id)
                                    ret = 1;
                            });
                            callback(ret, value);
                        }
                    }
                }
                else
                {
                    // library is empty
                    callback(-1, value);
                }
            }
        );
    };

    renderAddButton = () => {
        if(this.props.addButton == 1)
        {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if(this.state.added == 0)
                            this.addBookToLibrary();
                    }}
                    style={{ alignSelf: 'stretch',
                        flex: 1, flexDirection: 'row', backgroundColor: this.state.addButtonBGCol, marginTop: 3,
                        paddingVertical: 3, paddingHorizontal: 9, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons
                      name={this.state.addButtonIcon}
                      size={18}
                      color='white'
                      style={{paddingRight: 4, fontWeight: 'bold', backgroundColor: 'transparent' }}
                    />
                    <Text style={{ color: 'white' }}>{ this.state.thingsToTranslate.favourite }</Text>
                </TouchableOpacity>
            );
        }
        else
            return null;
    };

    renderAddButton_BookScreen = () => {
        if(this.props.addButton == 1)
        {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if(this.state.added == 0)
                            this.addBookToLibrary();
                    }}
                    style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', margin: 3,
                        paddingVertical: 10, paddingHorizontal: 1, borderRadius: 15,
                        alignItems: 'center', justifyContent: 'center',
                        borderWidth:1, borderColor:'#106234' }}>
                    <Ionicons
                      name={this.state.addButtonIcon}
                      size={18}
                      color='#106234'
                      style={{paddingRight: 4, fontWeight: 'bold', backgroundColor: 'transparent' }}
                    />
                    <Text style={{ color: '#106234' }}>{this.state.thingsToTranslate.favourite}</Text>
                </TouchableOpacity>
            );
        }
        else
            return null;
    };

    onClickBuyButton = () => {
        AsyncStorage.getItem('login').then(
            (logged) => {
                if(logged == '1')
                {
                    AsyncStorage.getItem('userid').then(
                        (userid) => {

                        /*    Alert.alert(


                                ],
                                { cancelable: true } */


                                AsyncStorage.getItem("language").then((value) => {
                                  if (value == '1') {
                                Alert.alert(
                                    'نوع التوصيل',
                                    'كيف تريد ان يصل  لك هذا الكتاب',
                                      [
                                          {text: 'وصله الى مكاني', onPress: () => this.props.navigation.navigate('Payment', {book_id: this.props.id, user_id: userid, method: 0})},
                                          {text: 'اخذه بنفسي من الفرع', onPress: () => this.props.navigation.navigate('Payment', {book_id: this.props.id, user_id: userid, method: 1})},
                                      ],
                                      { cancelable: true })

                                  } else {
                            Alert.alert(
                                     'Delivery method',
                                    'How would you like this book to be delivered to you ?',
                                    [
                                        {text: 'Deliver to my place', onPress: () => this.props.navigation.navigate('Payment', {book_id: this.props.id, user_id: userid, method: 0})},
                                        {text: 'Pick it from branch', onPress: () => this.props.navigation.navigate('Payment', {book_id: this.props.id, user_id: userid, method: 1})},
                                    ],
                                    {cancelable:true}
                                )}
                                });
                        }
                    );
                }
                else
                {
                    Alert.alert(
                      'Cannot buy book',
                      'Cannot buy a book because you are not logged in',
                      [
                        {text: 'Okay'},
                      ],
                      { cancelable: true }
                  );
                }
            }
        );
    };

    renderPriceButton = () => {
        if(this.state.book_price == 0)
        {
            if(this.state.book_discount == 0)
            {
                return (
                    <View
                        style={{ alignSelf: 'stretch', flex: 1, flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#3B73DB' }}>Free</Text>
                    </View>
                );
            }
            else
            {
                return (
                    <TouchableOpacity
                        onPress={this.onClickBuyButton}
                        style={ styles.buyButton }>

                        <Text style={{ color: 'white', textDecorationLine: 'line-through', marginRight: 4 }}>Free</Text>
                        <Text style={{ color: 'white' }}>{this.state.book_discount} {this.state.price_text}</Text>
                    </TouchableOpacity>
                );
            }
        }
        else
        {
            if(this.state.book_discount == 0)
            {
                return (
                    <TouchableOpacity
                        onPress={this.onClickBuyButton}
                        style={ styles.buyButton }>

                        <Text style={{ color: 'white' }}>{this.state.book_price} {this.state.price_text}</Text>
                    </TouchableOpacity>
                );
            }
            else
            {
                return (
                    <TouchableOpacity
                        onPress={this.onClickBuyButton}
                        style={ styles.buyButton }>

                        <Text style={{ color: 'white', textDecorationLine: 'line-through', marginRight: 4 }}>{this.state.book_price}</Text>
                        <Text style={{ color: 'white' }}>{this.state.book_discount} {this.state.price_text}</Text>
                    </TouchableOpacity>
                );
            }
        }
    };

    renderPriceButton_BookScreen = () => {
        if(this.state.book_price == 0)
        {
            if(this.state.book_discount == 0)
            {
                return (
                    <TouchableOpacity
                        onPress={this.onClickBuyButton}
                        style={ styles.buyButton_BookScreen }>

                        <Text style={{ color: 'white', textDecorationLine: 'line-through', marginRight: 4 }}>مجاني</Text>
                        <Text style={{ color: 'white' }}>{this.state.book_discount} {this.state.price_text}</Text>
                    </TouchableOpacity>
                );
            }
            else
            {
                return (
                    <TouchableOpacity
                        onPress={this.onClickBuyButton}
                        style={ styles.buyButton_BookScreen }>

                        <Text style={{ color: 'white' }}>مجاني</Text>
                    </TouchableOpacity>
                );
            }
        }
        else
        {
            if(this.state.book_discount == 0)
            {
                return (
                    <TouchableOpacity
                        onPress={this.onClickBuyButton}
                        style={ styles.buyButton_BookScreen }>

                        <Text style={{ color: 'white' }}>{this.state.book_price} {this.state.price_text}</Text>
                    </TouchableOpacity>
                );
            }
            else
            {
                return (
                    <TouchableOpacity
                        onPress={this.onClickBuyButton}
                        style={ styles.buyButton_BookScreen }>

                        <Text style={{ color: 'white', textDecorationLine: 'line-through', marginRight: 4 }}>{this.state.book_price}</Text>
                        <Text style={{ color: 'white' }}>{this.state.book_discount} {this.state.price_text}</Text>
                    </TouchableOpacity>
                );
            }
        }
    };

    _TrimName = (name) => {
        return (name.length > 45) ? (name.substring(0, 42) + "...") : name;
    }

    render() {
        if(this.props.horizontal == 0)
        {
            return (
                <View style={{ margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{uri: this.props.book_photo}}
                       style={{width: 99, height: 140, borderRadius: 1, marginBottom: 9}} />

                    <View style={{ minHeight: '27%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ maxWidth: 120, fontSize: 15, fontWeight: 'bold', color: '#106234', textAlign: 'center' }}>
                            {this._TrimName(this.props.book_name.toUpperCase())}
                        </Text>
                        <Text style={{ maxWidth: 120, textAlign: 'center' }}>{this._TrimName(this.props.author_name)}</Text>
                    </View>

                    <View style={{ marginTop:4, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {this.renderPriceButton()}
                        {this.renderAddButton()}
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={{ flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                    <View style={{ width:'100%', flexDirection: 'row', margin: 10, flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Lightbox
                              renderContent={ () => {
                                  return (
                                      <Image source={{uri: this.props.book_photo}}
                                        resizeMode='contain'
                                        style={{width: null, resizeMode: 'contain', height: Dimensions.get('window').height, borderRadius: 3 }} />
                                  );
                              }}>
                              <Image source={{uri: this.props.book_photo}}
                                style={{ width: 100, height: 140, borderRadius: 3 }} />
                        </Lightbox>

                        <View style={{
                            flex:1,
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            paddingTop:4,
                            paddingLeft:9 }}>
                            <Text style={{ fontSize: 20, maxWidth:'100%', fontWeight: 'bold', color: '#106234' }}>{this.props.book_name.toUpperCase()}</Text>
                            <Text style={{  }}>{this.props.author_name}</Text>
                        </View>
                    </View>

                    <View style={{ paddingVertical:10, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {this.renderAddButton_BookScreen()}
                        {this.renderPriceButton_BookScreen()}
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
  buyButton: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3B73DB',
    marginBottom:2,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
},
buyButton_BookScreen: {
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#106234',
  margin:3,
  paddingVertical: 10,
  paddingHorizontal: 1,
  borderRadius: 13,
  alignItems: 'center',
  justifyContent: 'center'
}
});
