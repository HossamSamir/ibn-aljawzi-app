import React from 'react';
import { Linking, Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, AsyncStorage, TextInput, View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

import LoadingIndicator from '../../components/LoadingIndicator';
import Server from '../../constants/server';

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
            this.setState({ errorMsg: 'كلمه المرور قصيره جدا' });
            return;
        }
        if(this.state.password != this.state.cpassword)
        {
            this.setState({ errorMsg: 'كلمه المرور غير متطابقه' });
            return;
        }
        this.setState({ errorMsg: '' });

        fetch(Server.dest + '/api/signup?username='+this.state.username+'&password='+this.state.password+'&address='+this.state.address+'&email='+this.state.email,
        {headers: {'Cache-Control': 'no-cache'}}).
        then((res) => res.json()).then((resJson) => {
            if(resJson.response == 0)
                this.setState({ errorMsg: 'اسم المستخدم غير متاح' });
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

                    <KeyboardAvoidingView
                        behavior='position'
                        keyboardVerticalOffset={0}
                        style={{ }}
                        contentContainerStyle= {{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: Dimensions.get('window').width }}>
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
                                  placeholder='اسم المستخدم'
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
                                  placeholder='كلمه المرور'
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
                                  placeholder='تأكيد كلمه المرور'
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
                                  placeholder='البريد الالكتروني'
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
                                  placeholder='العنوان'
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
                                title="تسجيل" />
                        </View>

                        <Text style={{flex:0.4, textDecorationLine:'underline', color: '#63BA83', textAlign: 'center', paddingBottom: 5}}
                              onPress={() => Linking.openURL('http://178.62.17.251/terms-and-condition-and-policy')}>
                          عندما اضغط "تسجيل" اقر اني قرأت و اوافق على الشروط و الاحكام و سياسة تطبيق دار ابن الجوزي
                        </Text>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        color: '#106234',
        textAlign: 'left'
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
