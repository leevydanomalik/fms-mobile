import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const img = require('../../../assets/product.png')

class ReviewInfo extends Component {
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
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 0.5, borderTopColor: '#ccc' }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Document Information</Text>
                    </View>

                    <View style={{ flex: 0, marginBottom: 15 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                    </View>
                    
                    <View style={{ flex: 0, marginBottom: 15 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                        <View style={{ flex: 0, flexDirection: "row", alignItems: "flex-end", alignContent: 'flex-end', justifyContent: "space-between" }}>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868868</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 12, color: "#999" }}>+ Show</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 0, marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                        <View style={{ flex: 0, flexDirection: "row", alignItems: "flex-end", alignContent: 'flex-end', justifyContent: "space-between" }}>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868868</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 12, color: "#999" }}>+ Show</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 20, borderTopColor: '#ccc', borderTopWidth: 0.5, }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Materials</Text>
                    </View>
                    {dummy.map((dt, index) => {
                        return (
                            <View key={index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: ((index + 1) !== dummy.lenth) ? 10 : 0 }}>
                                <Text style={{ fontSize: 12, color: "#000" }}>MESRAN 20X20L ENDURO (A9000867)</Text>
                                <Text style={{ fontSize: 12, color: "#000" }}>HU00048 | 10-10-10-00</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default ReviewInfo