import React from 'react';
import { StackNavigator } from 'react-navigation';

import Feedback from '../screens/menu/Feedback';
import AboutUs from '../screens/menu/AboutUs';
import Settings from '../screens/menu/Settings';
import Orders from '../screens/menu/Orders';
import MyLibrary from '../screens/menu/MyLibrary';
import ListAll from '../screens/menu/ListAll';

const MenuNavigation = StackNavigator (
    {
        ListAll: { screen: ListAll },
        MyLibrary: { screen: MyLibrary },
        AboutUs: { screen: AboutUs },
        Feedback: { screen: Feedback },
        Settings: { screen: Settings },
        Orders: { screen: Orders },

    },
    {
        initialRouteName: 'ListAll',
        headerMode: 'none'
    }
);

export default MenuNavigation;
