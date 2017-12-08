import React from 'react';
import {
  WebView,
  View
} from 'react-native';
export default class Payment extends React.Component {
    static navigationOptions = {
        header: null
    }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          bounces={false}
          scrollEnabled={true}
          source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }} />
      </View>
    );
  }
}
