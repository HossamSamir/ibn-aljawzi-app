import React from 'react';
import { AsyncStorage, StyleSheet, TextInput, View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

import { NavigationActions } from 'react-navigation'

export default class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // not logged in
            'login': '0'
        }
    }

    setLoginStatus = (value) => {
        AsyncStorage.setItem('login', value);
        this.setState({ 'login': value });
    }

    componentDidMount = () => {
        AsyncStorage.getItem('login').then(
            (value) => {
                // not necessary anyway
                //this.setState({ 'login': value })

                if(value == '1')
                {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Intro' })
                      ]
                  }));
                }
            }
        );
    };

    static navigationOptions = {
        title: "Sign in"
    };

    render() {
        if(this.state.login == '1')
        {
            return null;
        }
        else
        {
            return (
                <View style={{ backgroundColor: 'white', height: '100%', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <Image
                      style={{
                          resizeMode: 'cover',
                          width: '100%',
                          height: '40%',
                          marginBottom: 30
                      }}
                      source={require('../../assets/images/register_cover.png')}/>

                    <View style={styles.inputsContainer}>
                        <View style={styles.singleInputContainer}>
                            <Ionicons
                              name={'md-contact'}
                              size={26}
                              color='#63BA83'
                              style={styles.inputIcon}/>

                              <TextInput
                                  underlineColorAndroid='transparent'
                                  placeholder='Username'
                                  placeholderTextColor='#BBBBBB'
                                  autoGrow={false}
                                  multiline={false}
                                  autoFocus={false}
                                  style={styles.textInput}
                              />
                        </View>

                        <View style={styles.singleInputContainer}>
                            <Ionicons
                              name={'md-lock'}
                              size={26}
                              color='#63BA83'
                              style={styles.inputIcon}/>

                              <TextInput
                                  underlineColorAndroid='transparent'
                                  placeholder='Password'
                                  placeholderTextColor='#BBBBBB'
                                  autoGrow={false}
                                  multiline={false}
                                  autoFocus={false}
                                  secureTextEntry={true}
                                  style={styles.textInput}
                              />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={() => {
                                    this.setLoginStatus('1');

                                    // navigate to intro
                                    this.props.navigation.dispatch(NavigationActions.reset({
                                      index: 0,
                                      actions: [
                                        NavigationActions.navigate({ routeName: 'Intro' })
                                      ]
                                  }))
                                }}
                                color='white'
                                backgroundColor='#106234'
                                containerViewStyle={{borderRadius:20}}
                                borderRadius={20}
                                fontWeight='bold'
                                buttonStyle={{width: '100%', padding: 9}}
                                title="Sign in" />
                        </View>

                        <View style={styles.signupButtonContainer}>
                            <Text style={{color: '#106234', marginBottom: 4}}>{"Don't have an account?"}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Button
                                    onPress={() => this.props.navigation.navigate("Signup")}
                                    color='white'
                                    backgroundColor='#106234'
                                    containerViewStyle={{borderRadius:20}}
                                    borderRadius={20}
                                    fontWeight='bold'
                                    buttonStyle={{width: '100%', padding: 9}}
                                    title="Create one" />
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        color: '#106234'
    },
    inputIcon: {
        backgroundColor: 'transparent',
        marginRight: 9
    },
    inputsContainer: {
        flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        width: '75%'
    },
    singleInputContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#63BA83',
        borderBottomWidth: 0.5
    },
    signupButtonContainer: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 35,
        flex: 0.4
    }
});
