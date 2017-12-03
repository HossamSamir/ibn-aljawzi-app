import React from 'react';
import { StackNavigator } from 'react-navigation';

import Feedback from '../screens/menu/Feedback';
import AboutUs from '../screens/menu/AboutUs';
import Settings from '../screens/menu/Settings';
import Orders from '../screens/menu/Orders';
import Signup from '../screens/menu/Signup';
import Signin from '../screens/menu/Signin';
import ListAll from '../screens/menu/ListAll';

const MenuNavigation = StackNavigator (
    {
        ListAll: { screen: ListAll },
        AboutUs: { screen: AboutUs },
        Feedback: { screen: Feedback },
        Settings: { screen: Settings },
        Orders: { screen: Orders },
        Signup: { screen: Signup },
        Signin: { screen: Signin },
    },
    {
        initialRouteName: 'ListAll',
        headerMode: 'none',
    }
);

export default MenuNavigation;
