import React, { Component } from 'react'
import { View, Text } from 'react-native'

class ReviewInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const {title} = this.props
        const dummy = [0, 1, 2, 3, 4]
        return (
            <View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 10, borderTopColor: '#f0f0f0' }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>{title ? title : 'Review Picking'}</Text>
                    </View>

                    <View style={{ flex: 0, marginBottom: 15 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>Material KIMAP</Text>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>A94949488809</Text>
                    </View>

                    <View style={{ flex: 0, marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>TOTE/HU</Text>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>A94949488809</Text>
                    </View>
                </View>

                <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 20, borderTopColor: '#ccc', borderTopWidth: 1, }}>
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
            </View>
        )
    }
}

export default ReviewInfo