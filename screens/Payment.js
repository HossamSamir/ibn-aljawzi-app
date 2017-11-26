import React from 'react';
import {
  WebView
} from 'react-native';
export default class Payment extends React.Component {
    static navigationOptions = {
        header: null
    }

  render() {
    return (
        <WebView
            source={{uri: 'https://github.com/facebook/react-native'}} />
    );
  }
}
