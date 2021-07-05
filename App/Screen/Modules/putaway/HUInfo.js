import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import BottomPopup from '../../Components/BottomPopup'
import ButtonNext from '../../Components/ButtonNext'
import CardBarcode from '../../Components/CardBarcode'

const img = require('../../../assets/product.png')

class MaterialDetail extends Component {
    render() {
        return (
            <View style={{ padding: 15 }}>
                <View style={{ 
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    alignItems: 'center',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    marginBottom: 15
                 }}>
                    <View style={{ height: 240, width: 200, borderRadius: 0 }} >
                        <Image source={img} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                    </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>Material KIMAP</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>A94949488809</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
            </View>
        )
    }
}

class DriverLicense extends Component {
    render() {
        return (
            <View style={{ padding: 15 }}>
                <View style={{ 
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    alignItems: 'center',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    marginBottom: 15
                 }}>
                    <View style={{ width: '100%', height: 240, marginBottom: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                        <Image source={require('../../../assets/sim-dummy.png')} resizeMode="contain" style={{ width: '100%', borderRadius: 5 }} />
                    </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>Driver License Detail</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>SIMC-00001-00001</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
            </View>
        )
    }
}

class HUInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            isMaterialDetail: false
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { onVerifiedPress, barcodeStatus } = this.props
        const { visibleBottomPopup, isMaterialDetail } = this.state
        return (
            <View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 10, borderTopColor: '#f0f0f0' }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>HU/Pallet</Text>
                    </View>

                    <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                        <View style={{ flex: 1, marginBottom: 0 }}>
                            <Text style={{ fontSize: 12, color: "#999" }}>Material KIMAP</Text>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>A94949488809</Text>
                            <Text style={{ fontSize: 10, color: "#999", marginTop: 5 }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                        </View>
                        <View style={{ width: 60, marginBottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: 60, width: 50, borderRadius: 0, marginBottom: 5 }} >
                                <Image source={img} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                            </View>
                            <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true, isMaterialDetail: true})}>
                                <Text style={{ fontSize: 12, color: "#999" }}>+ Enlarge</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <CardBarcode status={barcodeStatus} />

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={(isMaterialDetail) ? 'Material KIMAP' : 'Driver License Detail'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200) }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <ScrollView>
                                {(isMaterialDetail) ? <MaterialDetail /> : <DriverLicense />}
                            </ScrollView>
                            <View style={{padding: 15}}>
                                <ButtonNext 
                                    title={'Close'} 
                                    onPress={() => this.setState({visibleBottomPopup: false})} />
                            </View>
                        </View>
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

export default HUInfo