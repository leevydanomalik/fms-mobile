import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

class SealNumber extends React.Component {
    // constructor(props) {
    //     super(props)
    //     const { params } = props.navigation.state
    //     this.state = {}
    // }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { onVerifiedPress, code } = this.props
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Outbound/Inbound Seal Number</Text>
                        {/* <TouchableOpacity><Text style={{ fontSize: 12, color: "#000" }}>+ ScanQR</Text></TouchableOpacity> */}
                    </View>

                    <Text style={{ fontSize: 12, marginBottom: 20, color: "#000" }}>
                        This seal number is important notice to Driver and Gate Security and mandatory to be scanned both inbound/outbound
                    </Text>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 32, marginBottom: 25, fontWeight: 'bold', color: "#000" }}>{code ? code : 'OUTBSEAL#96869'}</Text>
                        <View style={{ width: 200, height: 200, alignItems: "center", justifyContent: "center" }}>
                            <QRCode size={200} value={code ? code : "B29228PPK"} />
                        </View>
                        <Text style={{ width: 280, textAlign: 'center', fontSize: 12, marginTop: 25, color: "#999" }}>This QR code can be used as ID for scanning by other department</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default SealNumber