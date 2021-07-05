import React from 'react'
import { View, Text } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { Colors } from '../../../Themes'

class ValidateQR extends React.Component {
    // constructor(props) {
    //     super(props)
    //     const { params } = props.navigation.state
    //     this.state = {}
    // }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { code, label, sublabel } = this.props
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20, alignItems: 'center' }}>
                    <View style={{ paddingLeft: 15, paddingRight: 15, alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: Colors.black, textAlign: 'center', marginBottom: 20 }}>
                            Validate this QR code when entry the Security Gate
                        </Text>

                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey, marginBottom: 10 }}>
                            Steps to follow
                        </Text>

                        <Text style={{ fontSize: 12, marginBottom: 20, color: Colors.black, textAlign: 'center' }}>
                            To accomplish the process of material inbound by transporter must follow theses following instruction sequentially
                        </Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 200, height: 200, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                            <QRCode size={200} value={code ? code : "B29228PPK"} />
                        </View>
                        <Text style={{ fontSize: 28, fontWeight: "bold", color: Colors.black, marginTop: 25, marginBottom: 5 }}>
                            {label ? label : 'PO#84848484'}
                        </Text>
                        <Text style={{ width: 280, textAlign: 'center', fontSize: 14, color: Colors.black }}>
                            {sublabel ? sublabel : '8272626666262-2928'}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default ValidateQR