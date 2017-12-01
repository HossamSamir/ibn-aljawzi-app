import React from 'react';
import { KeyboardAvoidingView, TextInput, Button, View, Text } from "react-native";

export default class Menu extends React.Component {
    static navigationOptions = {
        title: "Feedback"
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
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

                    <Button
                            onPress={() => this.props.navigation.navigate("NONE")}
                            color='#106234'
                            title="Send" />

                    </KeyboardAvoidingView>

            </View>
        );
    }
}
