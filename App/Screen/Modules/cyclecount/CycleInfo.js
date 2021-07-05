import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import BottomPopup from '../../Components/BottomPopup'
import { Colors } from '../../../Themes'

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

class CardMaterial extends Component {
    render () {
        const {countMaterial} = this.props
        return (
            <View style={{ marginTop: 1, backgroundColor: "#fff" }}>
                <View style={{ 
                        padding: 20, 
                        paddingBottom: 20, 
                        paddingTop: 20, 
                        flex: 0, 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        backgroundColor: "#fff", 
                        borderTopWidth: 0.5, 
                        borderTopColor: '#ccc'
                    }}>
                    {/* <View style={{ flex: 0 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>CATEGORY</Text>
                        <Text style={{ color: "#000", fontSize: 28, fontWeight: "bold" }}>45</Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>SEGMENT</Text>
                        <Text style={{ color: "#000", fontSize: 28, fontWeight: "bold" }}>9</Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>SERIES</Text>
                        <Text style={{ color: "#000", fontSize: 28, fontWeight: "bold" }}>90</Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>GROUP</Text>
                        <Text style={{ color: "#000", fontSize: 28, fontWeight: "bold" }}>10</Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                        <Text style={{ color: "#000", fontSize: 28, fontWeight: "bold" }}>10</Text>
                    </View> */}
                    <View style={{ flex: 0, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>MATERIAL</Text>
                        <Text style={{ color: "#000", fontSize: 28, fontWeight: "bold" }}>{countMaterial ? countMaterial : '0'}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class CycleInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { countMaterial, title, warehouse, period, note } = this.props
        const { visibleBottomPopup } = this.state
        return (
            <View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, paddingBottom: 0, borderTopWidth: 10, borderTopColor: '#f0f0f0' }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.black }}>{title}</Text>
                    </View>
                </View>

                <View style={{ padding: 20, flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1, marginBottom: 0 }}>
                        <View style={{ flex: 0, marginBottom: 5, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontWeight: 'bold', marginBottom: 5 }}>Warehouse</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 12, color: Colors.lightGrey, textAlign: 'right' }}>{warehouse ? warehouse : '-'}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0, marginBottom: 5, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 14, color: Colors.black, fontWeight: 'bold', marginBottom: 5 }}>Period</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 12, color: Colors.lightGrey, textAlign: 'right' }}>{period ? period : '-'}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0, marginBottom: 0 }}>
                            <Text style={{ fontSize: 12, color: Colors.black, marginTop: 0 }}>
                                {note ? note : '-'}
                            </Text>
                        </View>
                    </View>
                </View>
                
                <CardMaterial countMaterial={countMaterial} />

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'Material KIMAP'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200) }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <ScrollView>
                                <MaterialDetail />
                            </ScrollView>
                        </View>
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

export default CycleInfo