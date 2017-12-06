import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class OneBookCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            added: 0,
            addButtonText: 'Add',
            addButtonIcon: 'ios-star-outline',
            addButtonBGCol: '#106234'
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
        this.isBookInLibrary((status, data) => {

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
            else if(status == 1)
            {
                return;
            }

            //
            //todo: send to database
        });
    };

    isBookInLibrary = (callback) => {
        AsyncStorage.getItem('MyLibraryBooksIDs').then(
            (value) => {
                if(value !== null && value !== undefined)
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
                <View style={{ marginTop:6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if(this.state.added == 0)
                                this.addBookToLibrary();
                        }}
                        style={{ flex: 0.7, flexDirection: 'row', backgroundColor: this.state.addButtonBGCol, paddingVertical: 3, paddingHorizontal: 10,  borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons
                          name={this.state.addButtonIcon}
                          size={18}
                          color='white'
                          style={{paddingRight: 4, fontWeight: 'bold', backgroundColor: 'transparent' }}
                        />
                        <Text style={{ color: 'white' }}>{ this.state.addButtonText }</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else
            return null;
    };

    render() {
        return (
            <View style={{ margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{uri: this.props.book_photo}}
                   style={{width: 100, height: 140, borderRadius: 10, marginBottom: 9}} />

                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#106234' }}>{this.props.book_name.toUpperCase()}</Text>
                <Text style={{  }}>{this.props.author_name}</Text>

                {
                    this.shouldRenderAddButton()
                }
            </View>
        );
    }
}
