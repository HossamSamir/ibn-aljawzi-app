import React from 'react';
import { KeyboardAvoidingView, TextInput, View, Text } from "react-native";
import { Button } from "react-native-elements";

import MenuBackButton from './MenuBackButton'

export default class Feedback extends React.Component {
    static navigationOptions = {
        title: "Contact us"
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MenuBackButton navigation={this.props.navigation} />

                <KeyboardAvoidingView
                    behavior='padding'
                    style={{ width: '100%', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{color: '#111111', fontSize: 20, marginTop: 30, marginBottom: 10}}> Tell us what you think</Text>

                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholder='Type your message here...'
                        maxLength={512}
                        autoGrow={true}
                        multiline={true}
                        autoFocus={false}
                        placeholderTextColor='#AAAAAA'
                        style={{ textAlignVertical: 'top', width: '83%', height: '50%', maxHeight: '75%', color: 'black', backgroundColor: 'white', borderRadius: 14, fontSize: 18,
                             paddingTop: 5, paddingBottom: 5, paddingRight: 7, paddingLeft: 7, marginBottom: 16 }}/>

                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <Button
                                onPress={() => this.props.navigation.navigate("NONE")}
                                color='white'
                                backgroundColor='#106234'
                                containerViewStyle={{borderRadius:20}}
                                borderRadius={20}
                                fontWeight='bold'
                                buttonStyle={{width: '100%', padding: 9}}
                                title="Send" />
                    </View>

                    </KeyboardAvoidingView>

            </View>
        );
    }
}
