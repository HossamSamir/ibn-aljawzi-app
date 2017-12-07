import React from 'react';
import { AsyncStorage, FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class ListAll extends React.Component {

  componentDidMount() {
    AsyncStorage.getItem("language").then((value) => {
      if (value == '1') {
        this.setState({ thingsToTranslate: { orders: 'المشتريات', about: 'من نحن', contact: 'الاتصال بنا', settings: 'الاعدادات', logout: 'تسجيل الخروج' , desc: {
          orders: 'يمكنك التحكم في طلبات الكتب الخاصه بك من هنا'
        } } })
      } else {
        this.setState({ thingsToTranslate: { orders: 'Orders', about: 'About us', contact: 'Contact us', settings: 'Settings', logout: 'Logout', desc: {
          orders: 'You can control your orders here.',
        } } })
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      thingsToTranslate: {
        orders: 'Orders',
        about: 'About us',
        contact: 'Contact us',
        settings: 'Settings',
        logout: 'Logout',
        desc: {
          orders: 'You can control your orders here.',
          // about: 'You can control your orders here.',
          // contact: 'You can control your orders here.',
          // settings: 'You can control your orders here.',
          // logout: 'You can control your orders here.',
        }
      },
    }
  }


    static navigationOptions = {
        title: "More options",
    };

    render() {
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <Image
                  style={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '40%',
                      marginBottom: 11
                  }}
                  source={require('../../assets/images/menu-bg.jpg')}/>

                <FlatList
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  style={{  }}
                  data = {[
                    {key: 'Orders', icon: 'ios-cart-outline', title: this.state.thingsToTranslate.orders, description: this.state.thingsToTranslate.desc.orders},
                    {key: 'AboutUs', icon: 'ios-people-outline', title: this.state.thingsToTranslate.about, description: 'Who we are, what we\'re looking forward to and more.'},
                    {key: 'Feedback', icon: 'ios-mail-outline', title: this.state.thingsToTranslate.contact, description: 'Send feedback or report problems. We like to hear from you.'},
                    {key: 'Settings', icon: 'ios-cog', title: this.state.thingsToTranslate.settings, description: 'Adjust font size, currency and more.'},
                    {key: 'Logout', icon: 'ios-exit-outline', title: this.state.thingsToTranslate.logout, description: 'Log out of your account.'},
                  ]}
                  renderItem = {({ item }) => (
                      <TouchableOpacity
                        onPress={ () => {
                            if(item.key == 'Orders')
                            {
                                AsyncStorage.getItem('login').then(
                                    (logged) => {
                                        if(logged == '1')
                                        {
                                            this.props.navigation.navigate('Orders', {})
                                        }
                                        else
                                        {
                                            Alert.alert(
                                              'Cannot view orders',
                                              'Cannot view orders because you are not logged in',
                                              [
                                                {text: 'Okay'},
                                              ],
                                              { cancelable: true }
                                            )
                                        }
                                    }
                                );
                            }
                            else if(item.key == 'Logout')
                            {
                                AsyncStorage.setItem('login', '0');
                                this.props.navigation.navigate("Signin", {})
                            }
                            else
                                this.props.navigation.navigate(item.key, {})
                        }}
                        style={{ width:'100%', backgroundColor: 'white', padding: 11 }}
                        >

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Ionicons
                              name={item.icon}
                              size={26}
                              color='#63BA83'
                              style={{ backgroundColor: 'transparent', marginRight: 9}}/>
                              <Text style={{color: '#111111', fontSize: 18}}>{item.title}</Text>
                        </View>
                        <Text style={{ color: '#999999', fontSize: 14, marginLeft: 34, paddingBottom: 4, borderBottomColor: '#63BA83', borderBottomWidth: 0.5 }}>
                            {item.description}
                        </Text>
                      </TouchableOpacity>
                  )}
                  />
            </View>
        );
    }
}
