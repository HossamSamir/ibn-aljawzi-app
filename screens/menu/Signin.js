import React from 'react';
import { AsyncStorage, ActivityIndicator, StyleSheet, TextInput, View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import LoadingIndicator from '../../components/LoadingIndicator';

export default class Signin extends React.Component {
    setLoginStatus = (value) => {
        AsyncStorage.setItem('login', value);
        this.setState({ 'login': value });
    }

    navigateToHome = () => {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' })
          ]
        }));
    };

    constructor(props) {
        super(props);
        this.state = {
            'login': '1',
            'SkippedLogin': '1',
            username: '',
            password: '',
            errorMsg: '',
        }

        AsyncStorage.getItem('SkippedLogin').then(
            (value) => {
                this.setState({ 'SkippedLogin': value })

                if(value == '1')
                {
                    this.navigateToHome();
                }
                else
                {
                    AsyncStorage.getItem('login').then(
                        (logged) => {
                            this.setState({ 'login': logged })

                            if(logged == '1')
                            {
                                this.navigateToHome();
                            }
                        }
                    );
                }
            }
        );
    }

    loginUser = () => {
        if(this.state.username == '' || this.state.password == '' ||
            this.state.username.length < 3 || this.state.password.length < 4)
        {
            this.setState({ errorMsg: 'Cannot have very short inputs' });
            return;
        }
        this.setState({ errorMsg: '' });

        fetch('https://ecd1cd47.ngrok.io/api/signin?username='+this.state.username+'&password='+this.state.password).
        then((res) => res.json()).then((resJson) => {
            if(resJson.response == 0)
                this.setState({ errorMsg: 'Incorrect username or password' });
            else if(resJson.response > 0)
            {
                AsyncStorage.setItem('userid', resJson.response);
                AsyncStorage.setItem('MyLibraryBooksIDs', resJson.MyLibraryBooksIDs);
                AsyncStorage.setItem('currency', resJson.currency);
                this.setLoginStatus('1');
                this.props.navigation.dispatch(NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Main' })
                  ]
                }));
            }
        })
    };

    shouldRenderErrorMessage = () => {
        if(this.state.errorMsg != '')
        {
            return (
                <View style={{ paddingVertical: 3, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: 'red' }}>{this.state.errorMsg}</Text>
                </View>
            );
        }
    };

    static navigationOptions = {
        header: null
    };

    render() {
        if(this.state.login == '1' || this.state.SkippedLogin == '1')
        {
            return (
                <LoadingIndicator size="large" color="#106234" />
            );
        }
        else
        {
            return (
                <View style={{ backgroundColor: 'white', height: '100%', flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <Image
                      style={{
                          resizeMode: 'contain',
                          width: '100%',
                          height: '40%'
                      }}
                      source={require('../../assets/images/register_cover.png')}/>

                    {this.shouldRenderErrorMessage()}

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
                                  onChangeText={(text) => this.setState({username:text})}
                                  onSubmitEditing={(event) => this.loginUser() }
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
                                  onChangeText={(text) => this.setState({password:text})}
                                  onSubmitEditing={(event) => this.loginUser() }
                              />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={() => {
                                    this.loginUser()
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

                            <View style={{flex: 1, marginBottom: 7, width: '90%'}}>
                                <Button
                                    onPress={() => {
                                        AsyncStorage.setItem('login', '0').then(() => {
                                            AsyncStorage.setItem('MyLibraryBooksIDs', '').then(() => {
                                                AsyncStorage.setItem('SkippedLogin', '1').then(() => {
                                                    this.props.navigation.dispatch(NavigationActions.reset({
                                                      index: 0,
                                                      actions: [
                                                        NavigationActions.navigate({ routeName: 'Main' })
                                                      ]
                                                    }));
                                                });
                                            });
                                        });
                                    }}
                                    color='#106234'
                                    backgroundColor='#C7F2DA'
                                    containerViewStyle={{borderRadius:20}}
                                    borderRadius={20}
                                    fontWeight='bold'
                                    buttonStyle={{padding: 9}}
                                    containerViewStyle={{width: '100%', marginLeft: 0}}
                                    title="Continue" />
                            </View>

                            <View style={{flex: 1, width: '90%'}}>
                                <Button
                                    onPress={() => this.props.navigation.navigate("Signup")}
                                    color='white'
                                    backgroundColor='#106234'
                                    containerViewStyle={{borderRadius:20}}
                                    borderRadius={20}
                                    fontWeight='bold'
                                    buttonStyle={{padding: 9}}
                                    containerViewStyle={{width: '100%', marginLeft: 0}}
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
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    buttonContainer: {
        marginTop: 35,
        flex: 0.4
    }
});
