import React from 'react'
import { View, Text } from 'react-native'

const blue = "#0e74ff"

class CardKir extends React.Component {
    render() {
        return (
            <View style={{ padding: 20, backgroundColor: "#fff", marginTop: 10 }}>
                <View style={{ paddingBottom: 10, flexDirection: "row", alignItems: "flex-end" }}>
                    <View style={{ width: 80, position: "absolute", right: 0, alignItems: "center", top: 0 }}>
                        <View style={{ width: '100%', backgroundColor: blue, alignItems: "center", borderRadius: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 10 }} >VERIFIED</Text>
                        </View>
                        <Text style={{ fontSize: 10 }}>KIR#0996859</Text>
                    </View>
                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>KIR#0996859</Text>
                    <Text style={{ fontSize: 10, marginLeft: 5, width: 170 }} numberOfLines={2}>Expire 12 March 2020</Text>
                </View>

                <View style={{ marginLeft: -20, marginRight: -20, height: 1, backgroundColor: "#ccc" }} />

                {["","",""].map((data, index) => {
                    return (
                        <View key={index} style={{ flexDirection: "row", paddingTop: 10 }}>
                            <Text style={{ flex: 1 }}>K985858</Text>
                            <Text style={{ flex: 1 }}>Mesran 4x10</Text>
                            <Text style={{ flex: 1, textAlign: "right" }}>400</Text>
                            <Text style={{ flex: 1, textAlign: "right" }}>BOX</Text>
                        </View>
                    )
                })}
            </View>
        )
    }
}

export default CardKir