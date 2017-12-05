import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Picker } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            language: 0, // 0 = english, 1 = arabic
            font: 1, // 0 = small, 1 = medium, 2 = large
            currency: 0 // 0 = dollar, 1 = Saudi riyal
        }
    }

  render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
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
                        onValueChange={(itemValue) => this.setState({language: itemValue})}>
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
                        onValueChange={(itemValue) => this.setState({font: itemValue})}>
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
                        onValueChange={(itemValue) => this.setState({currency: itemValue})}>
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
