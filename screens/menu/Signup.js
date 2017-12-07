import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, AsyncStorage, TextInput, View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import LoadingIndicator from '../../components/LoadingIndicator';

export default class Signup extends React.Component {
    setLoginStatus = (value) => {
        AsyncStorage.setItem('login', value);
        this.setState({ 'login': value });
    }

    constructor(props) {
        super(props);
        this.state = {
            'login': '1',
            username: '',
            password: '',
            cpassword: '',
            address: '',
            email: '',
            errorMsg: '',
        }

        AsyncStorage.getItem('login').then(
            (value) => {
                this.setState({ 'login': value })

                if(value == '1')
                {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Main' })
                      ]
                    }));
                }
            }
        );
    }

    registerUser = () => {
        if(this.state.username == '' || this.state.password == '' || this.state.cpassword == '' ||
            this.state.email == '' || this.state.address == '' ||
            this.state.username.length < 3 || this.state.password.length < 4 || this.state.cpassword.length < 4 ||
            this.state.address.length < 4 || this.state.email.length < 4)
        {
            this.setState({ errorMsg: 'Cannot have very short inputs' });
            return;
        }
        if(this.state.password != this.state.cpassword)
        {
            this.setState({ errorMsg: 'Passwords do not match' });
            return;
        }
        this.setState({ errorMsg: '' });

        fetch('https://7f01cb95.ngrok.io/api/signup?username='+this.state.username+'&password='+this.state.password+'&address='+this.state.address+'&email='+this.state.email).
        then((res) => res.json()).then((resJson) => {
            if(resJson.response == 0)
                this.setState({ errorMsg: 'Username already taken' });
            else if(resJson.response > 0)
            {
                AsyncStorage.setItem('userid', resJson.response);
                AsyncStorage.setItem('MyLibraryBooksIDs', '');
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
        if(this.state.login == '1')
        {
            return (
                <LoadingIndicator size="large" color="#106234" />
            );
        }
        else
        {
            return (
                <ScrollView
                    contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                    style={{ backgroundColor: 'white', height: '100%', }}>
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
                                  onSubmitEditing={(event) => this.registerUser() }
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
                                  onSubmitEditing={(event) => this.registerUser() }
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
                                  placeholder='Confirm password'
                                  placeholderTextColor='#BBBBBB'
                                  autoGrow={false}
                                  multiline={false}
                                  autoFocus={false}
                                  secureTextEntry={true}
                                  style={styles.textInput}
                                  onChangeText={(text) => this.setState({cpassword:text})}
                                  onSubmitEditing={(event) => this.registerUser() }
                              />
                        </View>

                        <View style={styles.singleInputContainer}>
                            <Ionicons
                              name={'md-mail'}
                              size={26}
                              color='#63BA83'
                              style={styles.inputIcon}/>

                              <TextInput
                                  underlineColorAndroid='transparent'
                                  placeholder='Email'
                                  placeholderTextColor='#BBBBBB'
                                  autoGrow={false}
                                  multiline={false}
                                  autoFocus={false}
                                  style={styles.textInput}
                                  onChangeText={(text) => this.setState({email:text})}
                                  onSubmitEditing={(event) => this.registerUser() }
                              />
                        </View>

                        <View style={styles.singleInputContainer}>
                            <Ionicons
                              name={'md-home'}
                              size={26}
                              color='#63BA83'
                              style={styles.inputIcon}/>

                              <TextInput
                                  underlineColorAndroid='transparent'
                                  placeholder='Address'
                                  placeholderTextColor='#BBBBBB'
                                  autoGrow={false}
                                  multiline={false}
                                  autoFocus={false}
                                  style={styles.textInput}
                                  onChangeText={(text) => this.setState({address:text})}
                                  onSubmitEditing={(event) => this.registerUser() }
                              />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={() => {
                                    this.registerUser()
                                }}
                                color='white'
                                backgroundColor='#106234'
                                containerViewStyle={{borderRadius:20}}
                                borderRadius={20}
                                fontWeight='bold'
                                buttonStyle={{width: '100%', padding: 9}}
                                title="Sign up" />
                        </View>
                    </View>
                </ScrollView>
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
    buttonContainer: {
        marginTop: 35,
        flex: 0.4
    }
});
