import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import BottomPopup from './BottomPopup'
import ButtonNext from './ButtonNext'
import CardMaterial from './CardMaterialListSimple'

const img = require('../../assets/product.png')

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

class CardMaterialCheckSimple extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            countDone: 0,
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { onVerifiedPress, onPress, onScanner, data, warehouse, btnTitle, isRouteEnable, disableButton, isChecked } = this.props
        const { visibleBottomPopup, countDone } = this.state
        const { ml_number, do_number, wh_name } = this.props
        return (
            <View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 10, borderTopColor: '#f0f0f0', borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>Material List (#{ml_number ? ml_number : '-'})</Text>
                    </View>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, fontWeight: "normal", color: "#999" }}>#{do_number ? do_number : '-'}</Text>
                        <Text style={{ fontSize: 12, fontWeight: "normal", color: "#999" }}>{wh_name ? wh_name : '-'}</Text>
                    </View>
                </View>

                {data && data.map((dt, index) => {
                    return (
                        <CardMaterial 
                            key={index} 
                            data={dt}
                            isChecked={isChecked}
                            onScanner={onScanner ? (type) => onScanner(type, dt) : () => console.log('scanner')}
                            isRouteEnable={isRouteEnable}
                            onChange={(data) => this.setState({countDone: (this.state.countDone + data)})} 
                            onEnlarge={() => this.setState({visibleBottomPopup: true, isMaterialDetail: false})} />
                    )
                })}

                {(!disableButton) && (countDone >= data.length) && (
                    <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20}}>
                        <ButtonNext 
                            title={btnTitle ? btnTitle : 'Done and Next'} 
                            onPress={() => onPress()} />
                    </View>
                )}

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'Material KIMAP'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200)}}>
                        <ScrollView>
                            <MaterialDetail />
                        </ScrollView>
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

export default CardMaterialCheckSimple