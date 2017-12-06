import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default class LoadingIndicator extends Component {

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <ActivityIndicator
            size={this.props.size}
            color={this.props.color} />
      </View>
    );
  }
}
