import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CardChecklist from '../../Components/CardChecklist'

class GoodIssueInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { title, checkList, number, reference, delivery_order, onChange } = this.props
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>
                            {title ? title : 'Good Issue'}
                        </Text>
                    </View>

                    <View style={{ flex: 0, marginBottom: 15 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>NUMBER</Text>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                            {number ? number : '-'}
                        </Text>
                    </View>

                    <View style={{ flex: 0, marginBottom: 15 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                                {reference ? reference : '-'}
                            </Text>
                            {/* <TouchableOpacity onPress={() => console.log('show')}>
                                <Text style={{ fontSize: 12, color: "#999" }}>+ Show</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>

                    <View style={{ flex: 0, marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                                {delivery_order ? delivery_order : '-'}
                            </Text>
                            {/* <TouchableOpacity onPress={() => console.log('show')}>
                                <Text style={{ fontSize: 12, color: "#999" }}>+ Show</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 20, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Final Check</Text>
                    </View>
                    <CardChecklist data={checkList} onChange={(data) => onChange(data)} />
                </View>
            </View>
        )
    }
}

export default GoodIssueInfo