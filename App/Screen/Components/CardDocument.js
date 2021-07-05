import React from 'react'
import { View, Text } from 'react-native'
import CardWarehouseRoute from './CardWarehouseRoute'

class CardDocument extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {title, docID, desc, pointer, fromTo, shipTo, type } = this.props
        return (
            <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 15 }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>{title ? title : "Document"}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{type}#{docID}</Text>
                    <Text style={{ fontSize: 12, marginTop: 5, color: "#999" }}>{desc}</Text>
                </View>

                <View style={{ marginTop: 20, marginBottom: 5 }}>
                    <CardWarehouseRoute 
                        start={{title: fromTo.title, subtitle: fromTo.date}}
                        stop={{title: shipTo.title, subtitle: shipTo.date}}
                    />
                </View>
            </View>
        )
    }
}

export default CardDocument