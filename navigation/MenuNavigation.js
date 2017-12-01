import React from 'react';
import { StackNavigator } from 'react-navigation';

import Feedback from '../screens/menu/Feedback';
import AboutUs from '../screens/menu/AboutUs';
import ListAll from '../screens/menu/ListAll';

const MenuNavigation = StackNavigator (
    {
        ListAll: { screen: ListAll },
        AboutUs: { screen: AboutUs },
        Feedback: { screen: Feedback },
    },
    {
        initialRouteName: 'ListAll',
        headerMode: 'none',
    }
);

export default MenuNavigation;
