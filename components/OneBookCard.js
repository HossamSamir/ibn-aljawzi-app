import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert,
  StyleSheet
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
            book_price: 0,
            book_discount: 0,
            price_text: 'ر.س'
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
                    })
                    .then(() => {
                    }).catch(error => {
                        console.error(error);
                    Alert.alert('price2',JSON.stringify(error),[{text: 'Ask me later'} ])
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

                                    fetch(Server.dest + '/api/add-my-library?user_id='+userid+'&book_id='+this.props.id, {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {
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
                    style={{ alignSelf: 'stretch', flex: 1, flexDirection: 'row', backgroundColor: this.state.addButtonBGCol, marginTop: 3, paddingVertical: 3, paddingHorizontal: 9,  borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
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

    onClickBuyButton = () => {
        AsyncStorage.getItem('login').then(
            (logged) => {
                if(logged == '1')
                {
                    AsyncStorage.getItem('userid').then(
                        (userid) => {
                            Alert.alert(
                                'Delivery type',
                                'How do you want to receive this book?',
                                [
                                    {text: 'Ship it to me', onPress: () => this.props.navigation.navigate('Payment', {book_id: this.props.id, user_id: userid, method: 0})},
                                    {text: 'By myself from branch', onPress: () => this.props.navigation.navigate('Payment', {book_id: this.props.id, user_id: userid, method: 1})},
                                ],
                                { cancelable: true }
                            )
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

    renderPrice = () => {
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
                        style={styles.buyButton}>

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
                        style={styles.buyButton}>

                        <Text style={{ color: 'white' }}>{this.state.book_price} {this.state.price_text}</Text>
                    </TouchableOpacity>
                );
            }
            else
            {
                return (
                    <TouchableOpacity
                        onPress={this.onClickBuyButton}
                        style={styles.buyButton}>

                        <Text style={{ color: 'white', textDecorationLine: 'line-through', marginRight: 4 }}>{this.state.book_price}</Text>
                        <Text style={{ color: 'white' }}>{this.state.book_discount} {this.state.price_text}</Text>
                    </TouchableOpacity>
                );
            }
        }
    };

    render() {
        return (
            <View style={{ margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{uri: this.props.book_photo}}
                   style={{width: 100, height: 140, borderRadius: 10, marginBottom: 9}} />

                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#106234' }}>{this.props.book_name.toUpperCase()}</Text>
                <Text style={{  }}>{this.props.author_name}</Text>

                <View style={{ marginTop:4, flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {this.renderPrice()}
                    {this.shouldRenderAddButton()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  buyButton: {
    alignSelf: 'stretch', flex: 1, flexDirection: 'row', backgroundColor: '#3B73DB', marginBottom:2, paddingVertical: 3, paddingHorizontal: 9,  borderRadius: 15, alignItems: 'center', justifyContent: 'center'
  }
});
