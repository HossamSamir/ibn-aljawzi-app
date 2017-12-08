import React, { Component } from 'react';
import { Platform, Dimensions, AsyncStorage, ScrollView, Text, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SelectInput from 'react-native-select-input-ios';

import MenuBackButton from './MenuBackButton'

// API: load this.state.currency from database
// API: when user changes currency, send the new value to database

export default class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            language: 0, // 0 = english, 1 = arabic
            currency: 0 // 0 = dollar, 1 = Saudi riyal
        }
    }

    componentDidMount() {
        this.loadSettings();
    }

    readSettingFromStorage = (setting, callback) => {
        AsyncStorage.getItem(setting).then(
            (value) => {
                callback(value);
            }
        );
    };

    loadSettings = () => {
        var settingsArr = ['language', 'currency'];
        settingsArr.map((setting, index) => {
            this.readSettingFromStorage(setting, (value) => {
                if(value !== null && value !== undefined)
                {
                    switch(index)
                    {
                        case 0:
                            this.setState({ 'language': parseInt(value) })
                            break;
                        case 1:
                            this.setState({ 'currency': parseInt(value) })
                            break;
                    }
                }
            });
        });
    };

    onLanguageChange = (newValue) => {
        AsyncStorage.setItem('language', String(newValue));
        this.setState({language: newValue});
        this.props.navigation.navigate("Signin", {});

    };

    onCurrencyChange = (newValue) => {
        AsyncStorage.setItem('currency', String(newValue));
        this.setState({currency: newValue});

        AsyncStorage.getItem('login').then(
            (logged) => {
                if(logged == '1')
                {
                    AsyncStorage.getItem('userid').then(
                        (userid) => {
                            fetch('https://ecd1cd47.ngrok.io/api/set_currency?user_id='+userid+'&currency='+newValue).then((res) => res.json()).then((resJson) => {
                                
                            });
                        }
                    );
                }
            }
        );
    };

  render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <MenuBackButton navigation={this.props.navigation} />

                <View style={styles.innerContainer}>
                    <View style={styles.captionContainer}>
                        <MaterialIcons
                          name={'language'}
                          size={26}
                          color='#63BA83'
                          style={styles.icon}/>

                          <Text style={styles.captionText}>Language</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <SelectInput
                            buttonsTextColor='#104A25'
                            buttonsBackgroundColor='#F5FAF7'
                          value={this.state.language}
                          submitKeyText='Change'
                          options={[
                              {value: 0, label: 'English'},
                              {value: 1, label: 'العربية'}
                          ]}
                          onSubmitEditing={(itemValue) => this.onLanguageChange(itemValue)}
                          style={styles.picker}
                        />
                    </View>
                </View>

                <View style={styles.innerContainer}>
                    <View style={styles.captionContainer}>
                        <Ionicons
                          name={'md-cash'}
                          size={26}
                          color='#63BA83'
                          style={styles.icon}/>

                          <Text style={styles.captionText}>Currency</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <SelectInput
                            buttonsTextColor='#104A25'
                            buttonsBackgroundColor='#F5FAF7'
                          value={this.state.currency}
                          submitKeyText='Change'
                          options={[
                              {value: 0, label: 'United States Dollar ($)'},
                              {value: 1, label: 'Saudi riyal'}
                          ]}
                          onSubmitEditing={(itemValue) => this.onCurrencyChange(itemValue)}
                          style={styles.picker}
                        />
                    </View>
                </View>
              </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width
    },
    innerContainer: {
        flex: 1,
        padding: 18
    },
    captionContainer: {
        flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
    },
    captionText: {
        color: '#111111',
        fontSize: 18,
        fontWeight: 'bold'
    },
    pickerContainer: {
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    picker: {
        paddingVertical: (Platform.OS === 'ios' ? 8 : 0),
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: '#63BA83',
        width: '70%'
    },
    icon: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginRight: 10
    }
});
