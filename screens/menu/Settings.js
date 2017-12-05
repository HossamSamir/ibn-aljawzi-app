import React, { Component } from 'react';
import { AsyncStorage, ScrollView, Text, View, StyleSheet, Picker } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import MenuBackButton from './MenuBackButton'

// API: load this.state.currency from database
// API: when user changes currency, send the new value to database

export default class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            language: 0, // 0 = english, 1 = arabic
            font: 1, // 0 = small, 1 = medium, 2 = large
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
        var settingsArr = ['language', 'font', 'currency'];
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
                            this.setState({ 'font': parseInt(value) })
                            break;
                        case 2:
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

    };

    onCurrencyChange = (newValue) => {
        AsyncStorage.setItem('currency', String(newValue));
        this.setState({currency: newValue});

    };

    onFontChange = (newValue) => {
        AsyncStorage.setItem('font', String(newValue));
        this.setState({font: newValue});

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

                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.language}
                        onValueChange={(itemValue) => this.onLanguageChange(itemValue)}>
                        <Picker.Item label="English" value={0} />
                        <Picker.Item label="العربية" value={1} />
                    </Picker>
                </View>

                <View style={styles.innerContainer}>
                    <View style={styles.captionContainer}>
                        <MaterialIcons
                          name={'format-size'}
                          size={26}
                          color='#63BA83'
                          style={styles.icon}/>

                          <Text style={styles.captionText}>Font size</Text>
                    </View>

                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.font}
                        onValueChange={(itemValue) => this.onFontChange(itemValue)}>
                        <Picker.Item label="Large" value={2} />
                        <Picker.Item label="Medium" value={1} />
                        <Picker.Item label="Small" value={0} />
                    </Picker>
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

                    <Picker
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        selectedValue={this.state.currency}
                        onValueChange={(itemValue) => this.onCurrencyChange(itemValue)}>
                        <Picker.Item label="Saudi riyal" value={1} />
                        <Picker.Item label="United States Dollar ($)" value={0} />
                    </Picker>
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
        paddingTop: 21
    },
    innerContainer: {
        flex: 1,
        padding: 18
    },
    captionContainer: {
        paddingTop: 10,
        flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
    },
    captionText: {
        color: '#111111',
        fontSize: 18,
        fontWeight: 'bold'
    },
    picker: {
        color: '#555555',
        marginTop: 0,

    },
    pickerItem: {

    },
    icon: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginRight: 10
    }
});
