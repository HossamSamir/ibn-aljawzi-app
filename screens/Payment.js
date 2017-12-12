import React from 'react';
import {
  WebView,
  View
} from 'react-native';

import Server from '../constants/server';
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
          source={{ uri: Server.dest + '/buy-first?user_id='+this.props.navigation.state.params.user_id+'&book_id='+this.props.navigation.state.params.book_id+'&method='+this.props.navigation.state.params.method }} />
      </View>
    );
  }
}
