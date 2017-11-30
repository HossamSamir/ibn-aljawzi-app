import React from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class Feedback extends React.Component {
    static navigationOptions = {
        title: "Feedback",
        drawerLabel: "Feedback Screen",
        drawerIcon: ({tintColor}) => {
            return (
                <Ionicons
                  name='ios-mail-outline'
                  size={26}
                  color='black'/>
            );
        }
    };

    render() {
        return (
            <View style={{paddingTop: 150}}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    style={{width:'100%', backgroundColor: 'lightblue', padding: 7}}>

                    <Text style={{color: 'white'}}>Open menu from Feedback screen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
