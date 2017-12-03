import React from 'react';
import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/Header';

export default class ListAll extends React.Component {
    static navigationOptions = {
        title: "More options",
        header: <Header />
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
                    {key: 'Orders', icon: 'ios-cart-outline', title: 'Orders', description: 'You can control your orders here.'},
                    {key: 'AboutUs', icon: 'ios-people-outline', title: 'About us', description: 'Who we are, what we\'re looking forward to and more.'},
                    {key: 'Feedback', icon: 'ios-mail-outline', title: 'Contact us', description: 'Send feedback or report problems. We like to hear from you.'},
                    {key: 'Settings', icon: 'ios-cog', title: 'Settings', description: 'Adjust font size, currency and more.'}
                  ]}
                  renderItem = {({ item }) => (
                      <TouchableOpacity
                        onPress={ () => this.props.navigation.navigate(item.key, {})}
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
