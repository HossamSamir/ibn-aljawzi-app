import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default class StoresListTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storesInfo: [
            {
                ID: 0,
                name: 'فرع الدمام - طريق الملك فهد - المملكة العربية السعودية',
                phone: '0138428146  - 0138467593 ',
                fax: '0138412100',
                mailbox:'2957 ',
                postalCode: '32253',
                email:'aljawzi@hotmail.com',
            },
            {
                ID: 1,
                name: 'فرع الرياض: مقابل جامعة الإمام محمد بن سعود بوابة 2',
                phone:'0112107228',
                tele:'0503857988',
            },
            {
                ID: 2,
                name: 'فرع جدة: حي الجامعة',
                phone:'0126813706',
                tele:'0592041371'
            },
            {
                ID: 3,
                name: 'فرع الإحساء: الهفوف - شارع الجامعة ',
                phone:'0135883122',
            },
            {
                ID: 4,
                name: 'جمهورية مصر العربية -  فرع القاهرة',
                phone:'010068237388',
            },
            {
                ID:5,
                name:'مواقع التواصل الاجتماعي:',
                Twitter:'@aljawzi',
                TwitterLink:'https://twitter.com/aljawzi',
                Facebook:' دار ابن الجوزي للنشر والتوزيع',
                FaceBookLink:'https://www.facebook.com/abnaljawzi/',
                instagram:'https://www.instagram.com/aljawzi',
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
        if(item.Twitter&&item.TwitterLink&&item.Facebook&&item.Facebook&&item.FaceBookLink&&item.instagram&&item.whatsapp&&item.telegram&&item.telegramLink)
        {
            return (
                <View>
                <Text style={{textAlign: 'right', marginVertical: 8, }}>
                    {item.Twitter + ' :'}
                    <Ionicons
                      name='logo-twitter'
                      size={28}
                      style={{ color: '#106234', }}
                    />
                </Text>
                <Text style={{textAlign: 'right', marginVertical: 8,color:'blue',textDecorationLine:'underline' }}
                onPress={() =>Linking.openURL(item.TwitterLink)}>
                    {item.TwitterLink + ' :'}
                </Text>
                <Text style={{textAlign: 'right', marginVertical: 8,color:'blue',textDecorationLine:'underline' }}
                onPress={() =>Linking.openURL(item.instagram)}>
                    {item.instagram + ' :'}
                    <Ionicons
                      name='logo-instagram'
                      size={28}
                      style={{ color: '#106234', }}
                    />
                </Text>
                <Text style={{textAlign: 'right', marginVertical: 8, }}>
                    {item.Facebook + ' :'}
                    <Ionicons
                      name='logo-facebook'
                      size={28}
                      style={{ color: '#106234', }}
                    />
                </Text>
                <Text style={{textAlign: 'right', marginVertical: 8,color:'blue',textDecorationLine:'underline' }}
                onPress={() =>Linking.openURL(item.FaceBookLink)}>
                    {item.FaceBookLink + ' :'}
                </Text>
                <Text style={{textAlign: 'right', marginVertical: 8,color:'blue',textDecorationLine:'underline' }}
                onPress={() =>Linking.openURL('whatsapp://send?phone=' + item.whatsapp)}>
                    {item.whatsapp + ' :'}
                    <Ionicons
                      name='logo-whatsapp'
                      size={28}
                      style={{ color: '#106234', }}
                    />
                </Text>
                <Text style={{textAlign: 'right', marginVertical: 8, }}>
                    {item.telegram + ' :'}
                </Text>
                <Text style={{textAlign: 'right', marginVertical: 8,color:'blue',textDecorationLine:'underline' }}
                onPress={() =>Linking.openURL(item.telegramLink)}>
                    {item.telegramLink + ' :'}
                </Text>
                </View>
            );
        }
    };
    Rendermailbox = (item) => {
        if(item.mailbox)
        {
            return (
                <Text style={{textAlign: 'right', marginVertical: 8, }}>
                    {item.mailbox + ' :'}
                    <Ionicons
                      name='md-mail-open'
                      size={28}
                      style={{ color: '#106234', }}
                    />
                </Text>
            );
        }
    };
    Renderfax = (item) => {
    if(item.fax)
    {
        return (
            <Text style={{textAlign: 'right', marginVertical: 8, }}>
                {item.fax + ' :'}
                <Ionicons
                  name='ios-calculator-outline'
                  size={28}
                  style={{ color: '#106234', }}
                />
            </Text>
        );
    }
};
RenderpostalCode = (item) => {
    if (item.postalCode)
    {
        return(
            <Text style={{textAlign: 'right', marginVertical: 8, }}>
                {item.postalCode + ' :'}
                <Ionicons
                  name='ios-mail-outline'
                  size={28}
                  style={{ color: '#106234', }}
                />
            </Text>
        );
    }
};
RenderTele = (item) => {
    if (item.tele)
    {
        return(
            <Text style={{textAlign: 'right', marginVertical: 8, }}
            onPress={() => Linking.openURL('whatsapp://send?phone=' + item.phone)}>
                {item.tele + ' :'}
                <Ionicons
                  name='ios-phone-portrait-outline'
                  size={28}
                  style={{ color: '#106234', }}
                />
            </Text>
        );
    }
};
RenderEmail = (item) => {
    if (item.email)
    {
        return(
            <Text style={{textAlign: 'right', marginVertical: 8, }}>
                {item.email + ' :'}
                <Ionicons
                  name='ios-mail-open'
                  size={28}
                  style={{ color: '#106234', }}
                />
            </Text>
        );
    }
};
Rendermailbox5 = (item) => {
    if (item.socialInfo)
    {
        return(
            <Text style={{textAlign: 'right', marginVertical: 8, }}>
                {item.socialInfo + ' :'}
            </Text>
        );
    }
};
RenderPhone = (item) => {
    if (item.phone)
    {
        return(
            <Text style={{textAlign: 'right', marginVertical: 8, }}>

                {item.phone + ' :'}
                <Ionicons
                name='ios-phone-portrait-outline'
                  size={28}
                  style={{ color: '#106234', }}
                />
            </Text>

        );
    }
};

    _keyExtractor = (store, index) => store.ID;
  render() {
    return (
        <FlatList
          data={this.state.storesInfo}
          renderItem={({item}) =>
            <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
                <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold', color: '#106234' }}>
                    {item.name}
                </Text>
                {this.RenderPhone(item)}
                {this.RenderTele(item)}
                {this.Renderfax(item)}
                {this.Rendermailbox(item)}
                {this.RenderpostalCode(item)}
                {this.RenderEmail(item)}
                {this.Rendermailbox5(item)}
                {this.Rendersocial(item)}
            </View>
         }
          keyExtractor={this._keyExtractor}
        />
    );
  }
}
