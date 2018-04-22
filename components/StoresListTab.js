import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default class StoresListTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storesInfo: [
            {
                ID: 0,
                name: 'فرع الدمام - طريق الملك فهد - المملكة العربية السعودية',
                tele: '0138428146  - 0138467593 ',
                fax: '0138412100',
                mailbox:'2957 ',
                postalCode: '32253',
                email:'aljawzi@hotmail.com',
            },
            {
                ID: 1,
                name: 'فرع الرياض: مقابل جامعة الإمام محمد بن سعود بوابة 2',
                tele:'0112107228',
                phone:'0503857988',
            },
            {
                ID: 2,
                name: 'فرع جدة: حي الجامعة',
                tele:'0126813706',
                phone:'0592041371'
            },
            {
                ID: 3,
                name: 'فرع الإحساء: الهفوف - شارع الجامعة ',
                tele:'0135883122',
            },
            {
                ID: 4,
                name: 'جمهورية مصر العربية -  فرع القاهرة',
                tele:'010068237388',
            },
            {
                ID:5,
                name:'مواقع التواصل الاجتماعي:',
                Twitter:'@aljawzi',
                TwitterLink:'https://twitter.com/aljawzi',
                Facebook:' دار ابن الجوزي للنشر والتوزيع',
                FaceBookLink:'https://www.facebook.com/abnaljawzi/',
                instagram:'@aljawzi',
                instagramLink:'https://www.instagram.com/aljawzi',
                whatsapp:'966503265348',
                telegram:'@ibn_aljawzi',
                telegramLink:'https://t.me/ibn_aljawzi',
            },

            ]
        }
    }
    //966503265348
    //Linking.openURL('whatsapp://send?phone=' + item.phone)}
    Rendersocial = (item) => {
        if(item.Twitter&&item.Facebook&&item.instagram&&item.whatsapp&&item.telegram)
        {
            return (
                <View>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Ionicons
                  name='logo-twitter'
                  size={28}
                  style={{ color: '#106234', }}
                />
                <Text style={{  marginVertical: 8, }}
                onPress={() =>Linking.openURL(item.TwitterLink)}>
                    {'  '+item.Twitter + '  '}
                </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Ionicons
                  name='logo-instagram'
                  size={28}
                  style={{ color: '#106234', }}
                />
                <Text style={{  marginVertical: 8 }}
                onPress={() =>Linking.openURL(item.instagramLink)}>
                    {'  '+item.instagram + '  '}
                </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Ionicons
                  name='logo-facebook'
                  size={28}
                  style={{ color: '#106234', }}
                />
                <Text style={{  marginVertical: 8, }}
                onPress={() =>Linking.openURL(item.FaceBookLink)}>
                    {'  '+item.Facebook + '  '}
                </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Ionicons
                  name='logo-whatsapp'
                  size={28}
                  style={{ color: '#106234', }}
                />
                <Text style={{  marginVertical: 8 }}
                onPress={() =>Linking.openURL('whatsapp://send?phone=' + item.whatsapp)}>
                    {'  '+item.whatsapp + '  '}
                </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <EvilIcons
                  name='sc-telegram'
                  size={28}
                  style={{ color: '#106234', }}
                />
                <Text style={{  marginVertical: 8, }}
                onPress={() =>Linking.openURL(item.telegramLink)}>
                    {'  '+item.telegram + '  '}
                </Text>
                </View>
                </View>
            );
        }
    };
    Rendermailbox = (item) => {
        if(item.mailbox)
        {
            return (
                <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Ionicons
                  name='md-mail-open'
                  size={28}
                  style={{ color: '#106234', }}
                />
                <Text style={{  marginVertical: 8, }}>
                    {'  '+item.mailbox+'  '}
                </Text>
                </View>
            );
        }
    };
    Renderfax = (item) => {
    if(item.fax)
    {
        return (
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            <Ionicons
              name='ios-calculator-outline'
              size={28}
              style={{ color: '#106234', }}
            />
            <Text style={{  marginVertical: 8, }}>
                {'  '+item.fax+'  ' }
            </Text>
            </View>
        );
    }
};
RenderpostalCode = (item) => {
    if (item.postalCode)
    {
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            <Ionicons
              name='ios-mail-outline'
              size={28}
              style={{ color: '#106234', }}
            />
            <Text style={{  marginVertical: 8, }}>
                {'  '+item.postalCode+'  '}
            </Text>
            </View>
        );
    }
};
RenderTele = (item) => {
    if (item.tele)
    {
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            <MaterialIcons
              name='ring-volume'
              size={28}
              style={{ color: '#106234', }}
            />
            <Text style={{  marginVertical: 8, }}>
                {'  '+item.tele+'  '}
            </Text>
            </View>
        );
    }
};
RenderEmail = (item) => {
    if (item.email)
    {
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            <Ionicons
              name='ios-mail-open'
              size={28}
              style={{ color: '#106234', }}
            />
            <Text style={{  marginVertical: 8, }}>
                {'  '+item.email+'  '}
            </Text>
            </View>
        );
    }
};

RenderPhone = (item) => {
    if (item.phone)
    {
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            <Ionicons
            name='ios-phone-portrait-outline'
              size={28}
              style={{ color: '#106234', }}
            />
            <Text style={{  marginVertical: 8, }}>
                {'  '+item.phone+'  '}
            </Text>
            </View>
        );
    }
};
RenderName = (item) => {
    if (item.name)
    {
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            <Text style={{   fontSize: 20, fontWeight: 'bold', color: '#106234' }}>
                {item.name}
            </Text>
            </View>
        );
    }
};
    _keyExtractor = (store, index) => store.ID;
  render() {
    return (
            <View style={{justifyContent:'flex-start'}}>
        <FlatList
          data={this.state.storesInfo}
          renderItem={({item}) =>
            <View style={{ marginVertical: 20, marginHorizontal: 30 , justifyContent:'flex-start'}}>

                {this.RenderName(item)}
                {this.RenderPhone(item)}
                {this.RenderTele(item)}
                {this.Renderfax(item)}
                {this.Rendermailbox(item)}
                {this.RenderpostalCode(item)}
                {this.RenderEmail(item)}
                {this.Rendersocial(item)}
            </View>
         }
          keyExtractor={this._keyExtractor}
        />
        </View>
    );
  }
}
