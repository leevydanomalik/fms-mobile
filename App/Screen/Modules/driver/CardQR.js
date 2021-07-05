import React from 'react'
import { View, Text } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import {Colors} from '../../../Themes'

class CardQR extends React.Component {
    render () {
        const { code } = this.props
        return (
                <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 20, alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Ticket Number</Text>
                    </View>

                    <Text style={{ width: '75%', fontSize: 16, marginBottom: 20, color: Colors.black, textAlign: 'center' }}>Congratulation you just completed your jobs. That’s great !!!</Text>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 200, height: 200, alignItems: "center", justifyContent: "center" }}>
                            <QRCode size={200} value={code ? code : "B29228PPK"} />
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 25, color: Colors.black, fontWeight: 'bold' }}>{code ? code : 'GT#9686968886'}</Text>
                    </View>
                </View>
        )
    }
}

export default CardQR