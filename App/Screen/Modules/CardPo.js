import React from 'react'
import { View, Text } from 'react-native'

const blue = "#0e74ff"

class CardPo extends React.Component {
    static defaultProps = {
        style: {},
        header: true
    }

    render() {
        const { style, header } = this.props
        return (
            <View style={[{ padding: 20, backgroundColor: "#fff", marginTop: 10 }, style]}>
                {header && (
                    <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 10 }}>
                        <View style={{ width: 80, position: "absolute", right: 0, alignItems: "center", top: 0 }}>
                            <View style={{ width: "100%", backgroundColor: blue, alignItems: "center", borderRadius: 5 }}>
                                <Text style={{ color: "#fff", fontSize: 10 }} >VERIFIED</Text>
                            </View>
                            <Text style={{ fontSize: 10 }}>PO#1291212</Text>
                        </View>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>PO#219312218</Text>
                        <Text style={{ fontSize: 10, marginLeft: 5, width: 150 }} numberOfLines={2}>LGN301 (Plumpang) to L201 (DSP Panjang)</Text>
                    </View>
                )}
                
                <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc", marginLeft: -20, marginRight: -20, paddingLeft: 20, paddingRight: 20, paddingBottom: 10  }}>
                    <Text style={{ color: "#000", flex: 1 }}>UPC/KIMAP</Text>
                    <Text style={{ color: "#000", flex: 1 }}>Material</Text>
                    <Text style={{ color: "#000", flex: 1, textAlign: "right" }}>Qty</Text>
                    <Text style={{ color: "#000", flex: 1, textAlign: "right" }}>UOM</Text>
                </View>

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

export default CardPo