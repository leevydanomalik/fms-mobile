import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import CardWarehouseRoute from '../Components/CardWarehouseRoute'
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config'
import { Colors } from '../../Themes';

const { height } = Dimensions.get('window')

class CardRoute extends React.Component {
    render() {
        const { data, plan, date, title, subtitle } = this.props
        console.log('doc_info', data)
        return (
            <View style={{ backgroundColor: "#fff", padding: 20, paddingTop: 5, paddingBottom: 0 }}>
                <View>
                    <View style={{ height: 50, flexDirection: "row" }}>
                        <View style={{ flex: 0.6 }}>
                            <Text style={{ flex: 1, color: "#000", fontWeight: "bold", fontSize: 18 }}>Route</Text>
                            <Text style={{ flex: 1, fontSize: 10, color: '#999' }}>Route Plan {plan}</Text>
                        </View>
                        <View style={{ flex: 0.4 }}>
                            <Text style={{ flex: 1, color: "#000", fontWeight: "bold", fontSize: 18, textAlign: 'right' }}>Delivery</Text>
                            <Text style={{ flex: 1, fontSize: 10, color: '#999', textAlign: "right" }}>{date ? date : ''}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 5, marginBottom: 15 }}>
                        <CardWarehouseRoute
                            centerTitle={title ? '' : ''}
                            centerSubtitle={subtitle ? '' : ''}
                            start={{
                                icon: "warehouse",
                                title: data && data.from.subtitle,
                                subtitle: data && data.from.date
                            }}
                            stop={{
                                icon: "warehouse",
                                title: data && data.to.subtitle,
                                subtitle: data && data.to.date
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginLeft: -20, marginRight: -20, height: height, backgroundColor: "#fff" }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: data && data.from && data.from.location ? data.from.location.latitude : -6.9024812,
                            longitude: data && data.from && data.from.location ? data.from.location.longitude : 107.6166213,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.03,
                        }}
                    >
                        <MapViewDirections
                            origin={data.from.location}
                            destination={data.to.location}
                            apikey={Config.GOOGLE_API_KEY}
                            strokeWidth={3}
                            strokeColor={Colors.main}
                        />
                        {data && data.from && data.from.location && (
                            <Marker
                                key={0}
                                coordinate={{
                                    latitude: data.from.location.latitude,
                                    longitude: data.from.location.longitude,
                                }}
                            // title={marker.title}
                            // description={marker.description}
                            />
                        )}
                        {data && data.to && data.to.location && (
                            <Marker
                                key={1}
                                coordinate={{
                                    latitude: data.to.location.latitude,
                                    longitude: data.to.location.longitude,
                                }}
                            // title={marker.title}
                            // description={marker.description}
                            />
                        )}
                    </MapView>
                </View>
            </View>
        )
    }
}

export default CardRoute