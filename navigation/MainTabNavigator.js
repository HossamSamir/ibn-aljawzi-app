import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import Categories from '../screens/Categories';
import MyLibrary from '../screens/MyLibrary';
import Stores from '../screens/Stores';
import MenuNavigation from './MenuNavigation';

export default TabNavigator(
  {
    "الرئيسيه": {
      screen: HomeScreen,
    },
    "مكتبتي": {
        screen: MyLibrary,
    },
    "الأقسام": {
      screen: Categories,
    },
    "الفروع": {
      screen: Stores,
    },
    "المزيد": {
      screen: MenuNavigation,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
        case 'الرئيسيه':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'الأقسام':
            iconName = Platform.OS === 'ios' ? `ios-keypad${focused ? '' : '-outline'}` : 'md-keypad';
            break;
        case 'مكتبتي':
            iconName =
              Platform.OS === 'ios' ? `ios-book${focused ? '' : '-outline'}` : 'md-book';
            break;
        case 'الفروع':
            iconName =
              Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map';
            break;
        case 'المزيد':
            iconName =
              Platform.OS === 'ios' ? `ios-more${focused ? '' : '-outline'}` : 'md-more';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={32}
            color={focused ? '#106234' : Colors.tabIconDefault}
          />
        );
      },

      // Removing bottom tab labels as the DAMN client asked .. and leaving the old code coz he's gonna want it back again.

      // tabBarLabel: ({ focused }) => {
      //   const { routeName } = navigation.state;
      //   return (
      //       <Text style={{textAlign: 'center', marginBottom: 8, fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Courier-Bold' : 'sans-serif-condensed' , fontWeight: 'bold', color: focused ? '#106234' : Colors.tabIconDefault }}> {routeName} </Text>
      //   );
      // },

      tabBarLabel: ({ focused }) => {
        const { routeName } = navigation.state;
        return (
            <Text>{null}</Text>
        );
      },

      // ....................../´¯/)
      // ....................,/¯../
      // .................../..../
      // ............./´¯/'...'/´¯¯`·¸
      // ........../'/.../..../......./¨¯\
      // ........('(...´...´.... ¯~/'...')
      // .........\.................'...../
      // ..........''...\.......... _.·´
      // ............\..............(
      // ..............\.............\...


    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    /*tabBarOptions: {
        style: {
            height: 57
        }
    }*/
  }
);
