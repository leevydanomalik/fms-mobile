import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CardContractDelivery from '../../Components/CardContractDelivery'
import CardPeriority from '../../Components/CardPeriority'

class LoadingInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const dummy = [0, 1, 2, 3, 4]
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Loading Order</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 12, marginBottom: 0, color: "#000", marginBottom: 0 }}>+ ScanQR</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 12, marginBottom: 0, color: "#000", marginBottom: 15 }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>

                    <View style={{ flex: 0, marginBottom: 15 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>TRUCK TYPE</Text>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>MERCY B86/TTH</Text>
                    </View>

                    <View style={{ flex: 0, marginBottom: 15 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>HEIGHT/LENGTH/WEIGHT</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>170/15/23.000</Text>
                        </View>
                    </View>

                    <View style={{ flex: 0, marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>LICENSE PLATE</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>B95858YYH</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20, marginBottom: 15, borderTopWidth: 0.5, borderTopColor: '#ccc' }}>
                    <CardContractDelivery />
                </View>

                <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 20, borderTopWidth: 0.5, borderTopColor: '#ccc' }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Materials</Text>
                    </View>
                    {dummy.map((dt, index) => {
                        return (
                            <View key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: ((index + 1) !== dummy.lenth) ? 10 : 0 }}>
                                <Text style={{ fontSize: 12, color: "#000" }}>MESRAN 20X20L ENDURO (A9000867)</Text>
                                <Text style={{ fontSize: 12, color: "#000" }}>20 BOX</Text>
                            </View>
                        )
                    })}
                </View>

                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 0.5, borderTopColor: '#ccc' }}>
                    <CardPeriority data={dummy} />
                </View>

                <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 20, borderTopWidth: 0.5, borderTopColor: '#ccc' }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Notes</Text>
                    </View>
                    <Text style={{ fontSize: 12, marginBottom: 0, color: "#000" }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                </View>
            </View>
        )
    }
}

export default LoadingInfo