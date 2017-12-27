import React from 'react';
import { MapView } from 'expo';

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
           }}
        >
        <MapView.Marker
            coordinate={{
                latitude: 24.824744,
                longitude: 46.615029,
            }}
            title="دار ابن الجوزي للنشر والتوزيع المملكة العربية السعودية"
            description="فرع رقم واحد"
        />
        <MapView.Marker
            coordinate={{
                latitude: 24.845844,
                longitude: 46.616029,
            }}
            title="دار ابن الجوزي للنشر والتوزيع المملكة العربية السعودية"
            description="فرع رقم اثنان"
        />
        </MapView>
    );
  }
}
