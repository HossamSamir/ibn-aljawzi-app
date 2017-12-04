import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import Intro from '../screens/Intro';
import Book from '../screens/Book';
import Payment from '../screens/Payment';
import Category from '../screens/Category';
import subCategory from '../screens/subCategory';

import Signup from '../screens/menu/Signup';
import Signin from '../screens/menu/Signin';


const RootStackNavigator = StackNavigator(
  {
      Signin: { screen: Signin },
      Signup: { screen: Signup },
      Intro: {
          screen: Intro,
      },
      Main: {
          screen: MainTabNavigator,
      },
      Book: {
        screen: Book,
      },
      Payment: {
        screen: Payment,
      },
      Category: {
        screen: Category,
      },
      subCategory: {
        screen: subCategory,
      },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
