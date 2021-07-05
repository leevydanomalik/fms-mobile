import React, { Component } from 'react'
import { View, Dimensions, Text, Image } from 'react-native'
import MapView from 'react-native-maps'
import Config from 'react-native-config'
import BottomSheet from 'react-native-bottomsheet-reanimated'
import { normalize, hasLocationPermission } from '../../Utils'
import { Colors, Styles } from '../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Geolocation from 'react-native-geolocation-service';
import LottieView from 'lottie-react-native'
import AnIcon from 'react-native-vector-icons/AntDesign'
import Ripple from 'react-native-material-ripple'

const { width, height } = Dimensions.get('screen')
const snapPoint = (height / 3)
const LATITUDE_DELTA = 0.0058
const LONGITUDE_DELTA = 0.0037

class TraccarMapScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            region: {
                // latitude: -6.9068174,
                // longitude: 107.5669277,
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        }
    }

    // decode(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}

    componentDidMount() {
        if (hasLocationPermission()) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log("post", position)
                    let { latitude, longitude } = position.coords
                    this.setState({ region: { ...this.state.region, latitude, longitude } })
                    if (this.mapview) {
                        this.mapview.animateToCoordinate({
                            latitude,
                            longitude
                        }, 1000);
                        if (this.marker) {
                            this.marker.animateMarkerToCoordinate({
                                latitude,
                                longitude
                            }, 1000);
                        }
                    }
                },
                (error) => {
                    // this.setState({ location: error, loading: false });
                    console.log('error position: ', error);
                },
                { enableHighAccuracy: true, timeout: 3000, maximumAge: 0, distanceFilter: 50, forceRequestLocation: true }
            );
        }
    }

    renderInner() {
        return (
            <View style={{ height: 0.90 * height, backgroundColor: "white", padding: 20, paddingTop: 0 }}>
                <Text style={{ fontSize: normalize(15), fontWeight: "bold", color: "#000" }}>Current GPS</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1, borderRightWidth: 2, borderColor: Colors.gray }}>
                        {this.state.region && ["Lat : " + this.state.region.latitude, "Lon  : " + this.state.region.longitude].map((data, index) => (
                            <Text key={index} style={{ fontWeight: "bold" }}>{data}</Text>
                        ))}
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: normalize(10), marginRight: 5, color: Colors.blue, fontWeight: "bold", paddingLeft: 10 }}>Delivery</Text>
                            <View style={{ width: 0.05 * width, height: 0.05 * width, backgroundColor: Colors.blue, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                <Icon name="arrow-circle-left" style={{ color: "black", fontSize: normalize(12) }} />
                            </View>
                        </View>

                        <View style={{ padding: 10, paddingBottom: 0 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ width: 0.05 * width, height: 0.05 * width, backgroundColor: Colors.blue, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                        <Icon name="arrow-circle-left" style={{ color: "black", fontSize: normalize(12) }} />
                                    </View>
                                </View>
                                <View style={{ flex: 0.9 }}>
                                    <Text style={{ fontSize: normalize(10), marginRight: 5, paddingLeft: 10 }}>Origin</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ width: 0.05 * width, height: 0.1 * width, alignItems: "center" }}>
                                        <View style={{ height: 0.1 * width, backgroundColor: Colors.blue, width: 2 }} />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ padding: 10, paddingTop: 0 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ width: 0.05 * width, height: 0.05 * width, backgroundColor: Colors.blue, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                        <Icon name="arrow-circle-left" style={{ color: "black", fontSize: normalize(12) }} />
                                    </View>
                                </View>
                                <View style={{ flex: 0.9 }}>
                                    <Text style={{ fontSize: normalize(10), marginRight: 5, paddingLeft: 10 }}>Destination</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={Styles.bottomSheetHeaderContainer}><View style={Styles.bottomSheetTip} /></View>
        )
    }



    render() {
        let { region } = this.state
        renderMarker = () => (
            <View style={{ backgroundColor: "red", height: 100, width: 100 }}>
                <LottieView source={require('../../assets/1528-sonar.json')} autoPlay loop />
            </View>
        )
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapview => this.mapview = mapview}
                    style={{ flex: 1 }}
                    initialRegion={region}
                >
                    <MapView.Marker
                        ref={marker => this.marker = marker}
                        // tracksViewChanges={false}
                        // icon={require('../../assets/circle-shape-outline.png')}
                        coordinate={region} >
                        <Image resizeMode="contain" source={require('../../assets/pin.png')} />
                        {/* {renderMarker()} */}
                    </MapView.Marker>
                </MapView>
                <Ripple 
                    onPress={() => this.props.navigation.goBack()}
                    style={{ 
                        flex: 0.1, 
                        width: 45, 
                        height: 45, 
                        borderRadius: 100, 
                        position: 'absolute', 
                        top: 10, 
                        left: 10,
                        backgroundColor: '#fff',
                        elevation: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <AnIcon size={26} color="#000" name="arrowleft" />
                </Ripple>
                <BottomSheet
                    initialPosition={snapPoint}
                    snapPoints={['92%', snapPoint]}
                    body={this.renderInner()}
                    header={this.renderHeader()}
                    headerStyle={Styles.bottomSheetHeader}
                    isBackDrop={false}
                    isBackDropDismisByPress={false}
                    isRoundBorderWithTipHeader={false}
                />
            </View>
        )
    }
}

export default TraccarMapScreen