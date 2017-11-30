import React from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class AboutUs extends React.Component {
    static navigationOptions = {
        title: "About us",
        drawerLabel: "About Us",
        drawerIcon: ({tintColor}) => {
            return (
                <Ionicons
                  name='ios-information-circle-outline'
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

                    <Text style={{color: 'white'}}>Open menu from About screen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
