import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Feedback from '../screens/Feedback';
import AboutUs from '../screens/AboutUs';

import MainTabNavigator from './MainTabNavigator';
//import Header from '../components/Header';

const DrawerNavigation = DrawerNavigator (
    {
        Home: { path: '/sent', screen: MainTabNavigator },
        "About Us": { path: '/sent', screen: AboutUs },
        "Feedback": { path: '/sent', screen: Feedback },
    },
    {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        /*navigationOptions: ({ navigation }) => ({
            header: <Header navigation={navigation} />
        }),*/
    }
);

export default DrawerNavigation;
