import React from 'react';
import { AsyncStorage, KeyboardAvoidingView, TextInput, View, Text } from "react-native";
import { Button } from "react-native-elements";

import MenuBackButton from './MenuBackButton'
import Server from '../../constants/server';

export default class Feedback extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          feedbackText: '',
          feedbackSent: 0
        }
    }

    sendFeedback = () => {
        if(this.state.feedbackText.length > 0)
        {
            AsyncStorage.getItem('login').then(
                (logged) => {
                    if(logged == '1')
                    {
                        AsyncStorage.getItem('userid').then(
                            (userid) => {
                                fetch(`${Server.dest}/api/send_feedback?user_id=${userid}&message=${this.state.feedbackText}`,
                                    { headers: { 'Cache-Control': 'no-cache' } }).then((res) => res.json()).then((resJson) => {
                                    if(resJson.status == 1)
                                    {
                                        this.setState({feedbackSent:1});
                                        Alert.alert(
                                          'Message delivered',
                                          'Your message have been delivered successfully',
                                          [
                                            {text: 'Okay'},
                                          ],
                                          { cancelable: true }
                                      );
                                    }
                                    else
                                    {
                                        Alert.alert(
                                          'Failed to send',
                                          'Failed to send your message',
                                          [
                                            {text: 'Okay'},
                                          ],
                                          { cancelable: true }
                                      );
                                    }
                                });
                            }
                        );
                    }
                    else
                    {
                        Alert.alert(
                          'Cannot send a message',
                          'Cannot send us a message because you are not logged in',
                          [
                            {text: 'Okay'},
                          ],
                          { cancelable: true }
                      );
                    }
                }
            );
        }
    };

    static navigationOptions = {
        title: "Contact us"
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MenuBackButton navigation={this.props.navigation} />

                <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={170}
                    style={{ flex: 1, justifyContent: 'space-between' }}>

                    <View style={{ width: '100%', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{color: '#111111', fontSize: 20, marginTop: 30, marginBottom: 10}}> Tell us what you think</Text>

                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder='Type your message here...'
                            maxLength={512}
                            autoGrow={true}
                            multiline={true}
                            autoFocus={false}
                            editable={(this.state.feedbackSent == 0) ? true : false}
                            onChangeText={(text) => this.setState({feedbackText:text})}
                            onSubmitEditing={(event) => this.sendFeedback() }
                            placeholderTextColor='#AAAAAA'
                            style={{ textAlignVertical: 'top', width: '83%', height: '50%', maxHeight: '75%', color: 'black', backgroundColor: 'white', borderRadius: 14, fontSize: 18,
                                 paddingTop: 5, paddingBottom: 5, paddingRight: 7, paddingLeft: 7, marginBottom: 16 }}/>

                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                            <Button
                                    onPress={() => this.sendFeedback()}
                                    color='white'
                                    disabled={(this.state.feedbackSent == 0) ? false : true}
                                    backgroundColor='#106234'
                                    containerViewStyle={{borderRadius:20}}
                                    borderRadius={20}
                                    fontWeight='bold'
                                    buttonStyle={{width: '100%', padding: 9}}
                                    title="Send" />
                        </View>
                    </View>

            </KeyboardAvoidingView>

        </View>
        );
    }
}
