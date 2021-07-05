import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const blue = "#0e74ff"

class CardLo extends React.Component {
    render() {
        return (
            <View style={{ padding: 20, backgroundColor: "#fff", marginTop: 10 }}>
                <View>
                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>LO#92392939</Text>
                    <TouchableOpacity style={{ width: 80, borderRadius: 2, alignItems: "center", backgroundColor: blue, position: "absolute", bottom: 5, right: 0 }}>
                        <Text style={{ color: "#fff", fontSize: 10 }}>CONFIRMED</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ flex: 1, fontSize: 10 }}>25 October 2020 - Partono - 8 x Mesran 4x10</Text>
                    <Text style={{ flex: 1, fontSize: 10, textAlign: "right" }}>FStg GR-400 to TStg BN-400 (40m20s)</Text>
                </View>

                <View style={{ marginBottom: 10, marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20, borderColor: "#ccc", borderTopWidth: 1, borderBottomWidth: 1, paddingTop: 5, paddingBottom: 5, flexDirection: "row" }}>
                    <View style={{ flex: 1}}>
                        <Text style={{ color: "#000", fontSize: 14 }}>Pallet#</Text>
                    </View>
                    <View style={{ flex: 1}}>
                        <Text style={{ color: "#000", fontSize: 14 }}>FStg</Text>
                    </View>
                    <View style={{ flex: 1}}>
                        <Text style={{ color: "#000", fontSize: 14 }}>TStg</Text>
                    </View>
                </View>
            
                {["","",""].map((data, index) => {
                    return (
                        <View key={index} style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <Text style={{ fontSize: 12, flex: 1 }}>K95851</Text>
                                <TouchableOpacity style={{ marginRight: 5, borderRadius: 2, backgroundColor: blue, flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                    <Text style={{ color: "#fff", fontSize: 10 }}>VERIFIED</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <Text style={{ fontSize: 12, flex: 1 }}>400</Text>
                                <TouchableOpacity style={{ marginRight: 5, borderRadius: 2, backgroundColor: blue, flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                    <Text style={{ color: "#fff", fontSize: 10 }}>VERIFIED</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <Text style={{ fontSize: 12, flex: 1 }}>400</Text>
                                <TouchableOpacity style={{ marginRight: 5, borderRadius: 2, backgroundColor: blue, flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                    <Text style={{ color: "#fff", fontSize: 10 }}>VERIFIED</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}

export default CardLo