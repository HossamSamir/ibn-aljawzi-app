import React from 'react';
import { AsyncStorage, ActivityIndicator, StyleSheet, TextInput, View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

import { NavigationActions } from 'react-navigation'

export default class Signin extends React.Component {
    setLoginStatus = (value) => {
        AsyncStorage.setItem('login', value);
        this.setState({ 'login': value });
    }

    navigateToHomeOrIntro = () => {
        AsyncStorage.getItem('login').then(
            (value) => {
                this.setState({ 'login': value })

                if(value == '1')
                {
                    AsyncStorage.getItem('seenIntro').then(
                        (value2) => {
                            var navigateTo = (value2 == '1') ? ('Main') : ('Intro');
                            this.props.navigation.dispatch(NavigationActions.reset({
                              index: 0,
                              actions: [
                                NavigationActions.navigate({ routeName: navigateTo })
                              ]
                            }));
                        }
                    );
                }
            }
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            'login': '1'
        }

        this.navigateToHomeOrIntro();
    }

    static navigationOptions = {
        header: null
    };

    render() {
        if(this.state.login == '1')
        {
            return (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                    <ActivityIndicator size="large" color="#106234" />
                </View>
            );
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
                                    this.navigateToHomeOrIntro();
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
