import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const imgBarcode = require('../../assets/barcode.png')

class CardBarcode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false
        }
    }

    render() {
        const { status } = this.state
        return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                <TouchableOpacity onPress={() => this.setState({status: !this.state.status})}>
                    <View style={{ height: 90, width: 200, borderRadius: 0 }} >
                        <Image source={imgBarcode} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                    </View>
                </TouchableOpacity>
                {status && <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 15}}>VALID</Text>}
            </View>
        )
    }
}

export default CardBarcode