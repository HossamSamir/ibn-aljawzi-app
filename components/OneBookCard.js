import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Server from '../constants/server';

export default class OneBookCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            added: 0,
            addButtonText: 'Add',
            addButtonIcon: 'ios-star-outline',
            addButtonBGCol: '#106234',
            book_price: 0
        }
    }

    componentDidMount ()
    {
        if(this.props.addButton == 1)
        {
            this.isBookInLibrary((result) => {
                if(result == 1)
                {
                    this.setState({
                        added: 1,
                        addButtonText: 'Added',
                        addButtonIcon: 'ios-checkmark-circle-outline',
                        addButtonBGCol: '#68B087'
                    });
                }
                else
                {
                    this.setState({
                        added: 0,
                        addButtonText: 'Add',
                        addButtonIcon: 'ios-star-outline',
                        addButtonBGCol: '#106234'
                    });
                }
            });
        }

        fetch(Server.dest + '/api/price_of_book?book_id='+this.props.id).
            then((res) => res.json()).then((resJson) => {
                this.setState({book_price: parseInt(resJson[0]['price'])});
            })
            .then(() => {
            }).catch(error => {
                console.error(error);
            Alert.alert('price2',JSON.stringify(error),[{text: 'Ask me later'} ])
          });
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

    addBookToLibrary = () => {
        AsyncStorage.getItem('login').then(
            (logged) => {
                if(logged == '1')
                {
                    this.isBookInLibrary((status, data) => {
                        if(status == 1)
                        {
                            return;
                        }
                        else
                        {
                            AsyncStorage.getItem('userid').then(
                                (userid) => {

                                    fetch(Server.dest + '/api/add-my-library?user_id='+userid+'&book_id='+this.props.id).then((res) => res.json()).then((resJson) => {
                                        if(resJson.reply == 1)
                                        {
                                            AsyncStorage.setItem('justAddedBook', '1');

                                            this.setState({
                                                added: 1,
                                                addButtonText: 'Added',
                                                addButtonIcon: 'ios-checkmark-circle-outline',
                                                addButtonBGCol: '#68B087'
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
                                        else
                                        {
                                            Alert.alert(
                                              'Failed to add',
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
                    });
                }
                else
                {
                    Alert.alert(
                      'Cannot save book',
                      'Cannot add books to your library because you are not logged in',
                      [
                        {text: 'Okay'},
                      ],
                      { cancelable: true }
                    )
                }
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

    shouldRenderAddButton = () => {
        if(this.props.addButton == 1)
        {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if(this.state.added == 0)
                            this.addBookToLibrary();
                    }}
                    style={{ flex: 0.7, flexDirection: 'row', backgroundColor: this.state.addButtonBGCol, paddingVertical: 3, paddingHorizontal: 9,  borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons
                      name={this.state.addButtonIcon}
                      size={18}
                      color='white'
                      style={{paddingRight: 4, fontWeight: 'bold', backgroundColor: 'transparent' }}
                    />
                    <Text style={{ color: 'white' }}>{ this.state.addButtonText }</Text>
                </TouchableOpacity>
            );
        }
        else
            return null;
    };

    shouldRenderBuyButton = () => {
        if(this.state.book_price == 0)
        {
            return null;
        }
        else
        {
            return (
                <TouchableOpacity
                    onPress={ () => { this.props.navigation.navigate('Payment', {}) }}
                    style={{ flex: 0.7, flexDirection: 'row', backgroundColor: '#3B73DB', marginLeft: 5, paddingVertical: 3, paddingHorizontal: 9,  borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ color: 'white' }}>Buy - { this.state.book_price }</Text>
                </TouchableOpacity>
            );
        }
    };

    render() {
        return (
            <View style={{ margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{uri: this.props.book_photo}}
                   style={{width: 100, height: 140, borderRadius: 10, marginBottom: 9}} />

                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#106234' }}>{this.props.book_name.toUpperCase()}</Text>
                <Text style={{  }}>{this.props.author_name}</Text>

                <View style={{ marginTop:6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {this.shouldRenderAddButton()}
                    {this.shouldRenderBuyButton()}
                </View>
            </View>
        );
    }
}
