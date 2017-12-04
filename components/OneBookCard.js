import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class OneBookCard extends React.Component {

    shouldRenderAddButton = () => {
        if(this.props.addButton == 1)
        {
            return (
                <View style={{ marginTop:6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flex: 0.7, flexDirection: 'row', backgroundColor: '#106234', paddingVertical: 3, paddingHorizontal: 10,  borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons
                          name='ios-add'
                          size={18}
                          color='white'
                          style={{paddingRight: 4, fontWeight: 'bold', backgroundColor: 'transparent' }}
                        />
                        <Text style={{ color: 'white' }}>Add</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else
            return null;
    };

    render() {
        return (
            <View style={{ margin: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={this.props.book_photo}
                   style={{width: 100, height: 140, borderRadius: 10, marginBottom: 9}} />

                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#106234' }}>{this.props.book_name.toUpperCase()}</Text>
                <Text style={{  }}>{this.props.author_name}</Text>

                {
                    this.shouldRenderAddButton()
                }
            </View>
        );
    }
}
