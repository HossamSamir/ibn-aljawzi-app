import React from 'react';
import { MapView } from 'expo';
import { Linking  } from 'react-native';
export default class MapTab extends React.Component {
  render() {
    return (

        <MapView
           style={{ flex: 1 }}
           initialRegion={{
             latitude: 24.824744,
             longitude: 46.615029,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
           }}>
        <MapView.Marker
            coordinate={{
                latitude: 24.824744,
                longitude: 46.615029,
            }}
            title="دار ابن الجوزي للنشر والتوزيع المملكة العربية السعودية"
            description="فرع رقم واحد"
            onPress={() => Linking.openURL('maps://app?saddr=Current+Location&daddr=24.824744,46.615029')}
        />
        <MapView.Marker
            coordinate={{
                latitude: 24.845844,
                longitude: 46.616029,
            }}
            title="دار ابن الجوزي للنشر والتوزيع المملكة العربية السعودية"
            description="فرع رقم اثنان"
            onPress={() => Linking.openURL('maps://app?saddr=Current+Location&daddr=24.845844,46.616029')}
        />
        <MapView.Marker
            coordinate={{
                latitude: 26.425453,
                longitude: 50.09854169999994,
            }}
            title="دار ابن الجوزي للنشر والتوزيع المملكة العربية السعودية"
            description="فرع رقم ثلاثة"
            onPress={() => Linking.openURL('maps://app?saddr=Current+Location&daddr=26.425453,50.09854169999994')}
        />
        <MapView.Marker
            coordinate={{
                latitude: 24.8030267,
                longitude: 46.70358149999993,
            }}
            title="دار ابن الجوزي للنشر والتوزيع المملكة العربية السعودية"
            description="فرع رقم اربعة"
            onPress={() => Linking.openURL('maps://app?saddr=Current+Location&daddr=24.8030267,46.70358149999993')}
        />
        <MapView.Marker
            coordinate={{
                latitude: 21.4805137,
                longitude: 39.23751400000003,
            }}
            title="دار ابن الجوزي للنشر والتوزيع المملكة العربية السعودية"
            description="فرع رقم خمسة"
            onPress={() => Linking.openURL('maps://app?saddr=Current+Location&daddr=21.4805137,39.23751400000003')}
        />
        <MapView.Marker
            coordinate={{
                latitude: 25.3631681,
                longitude: 49.5882304,
            }}
            title="دار ابن الجوزي للنشر والتوزيع المملكة العربية السعودية"
            description="فرع رقم ستة"
            onPress={() => Linking.openURL('maps://app?saddr=Current+Location&daddr=25.3631681,49.5882304')}
        />
        </MapView>
    );
  }
}
