import React from 'react';
import { StackNavigator } from 'react-navigation';

import Feedback from '../screens/menu/Feedback';
import AboutUs from '../screens/menu/AboutUs';
import Settings from '../screens/menu/Settings';
import Orders from '../screens/menu/Orders';
import ListAll from '../screens/menu/ListAll';

import Header from '../components/Header';

const MenuNavigation = StackNavigator (
    {
        ListAll: { screen: ListAll },
        AboutUs: { screen: AboutUs },
        Feedback: { screen: Feedback },
        Settings: { screen: Settings },
        Orders: { screen: Orders },
    },
    {
        initialRouteName: 'ListAll',
        headerMode: 'none',
        navigationOptions: ({ navigation }) => ({
            header: <Header nav={navigation} />,
        })
    }
);

export default MenuNavigation;
