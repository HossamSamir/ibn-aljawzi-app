import React from 'react';
import { View, Picker, StyleSheet, Text } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 0, // 0 = english, 1 = arabic
            font: 1, // 0 = small, 1 = medium, 2 = large
            currency: 0 // 0 = dollar, 1 = Saudi riyal
        }
    }

    static navigationOptions = {
        title: "Settings"
    };

    render() {
        return (
            <View style={styles.container}>
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
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
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
                        onValueChange={(itemValue, itemIndex) => this.setState({font: itemValue})}>
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
                        onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
                        <Picker.Item label="Saudi riyal" value={1} />
                        <Picker.Item label="United States Dollar ($)" value={0} />
                    </Picker>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20
    },
    innerContainer: {
        flex: 1,
        padding: 20,
        marginBottom: 20,
        width: '100%'
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
