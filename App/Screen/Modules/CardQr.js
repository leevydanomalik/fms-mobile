import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { Styles, Colors } from '../../Themes'

const blue = "#0e74ff"

class CardQr extends React.Component {
    static defaultProps = {
        singleMode: false,
        dualMode: false,
        sendAction: () => null,
        revokeAction: () => null,
        printAction: () => null,
        qrText: "YARD#867DOCK#009",
        mainDesc: "This QR Code is for the driver to access to all our warehouse area. Please keep it and in case your device malfunction or damage please print it",
        timestamps: "12:45:12 GMT+7 (#LYNN)",
        subDesc: ""
    }

    render() {
        const { singleMode, dualMode, sendAction, revokeAction, printAction, qrText, mainDesc, timestamps, subDesc } = this.props
        return (
            <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20, paddingLeft: 60, paddingRight: 60, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: "#000", marginBottom: 20 }}>{mainDesc}</Text>
                {subDesc !== "" && <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: "bold", color: Colors.main, marginBottom: 20 }}>{subDesc}</Text>}
                <QRCode size={150} value={qrText} />
                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 20, marginTop: 20 }}>{qrText}</Text>
                <Text style={{ fontSize: 12 }}>{timestamps}</Text>

                {dualMode && (
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <TouchableOpacity onPress={sendAction} style={{ backgroundColor: blue, flex: 1, padding: 5, borderRadius: 5, marginRight: 10 }}>
                            <Text style={{ color: "#fff", alignSelf: "center", fontSize: 20, fontWeight: "bold" }}>SEND IT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={revokeAction} style={{ backgroundColor: blue, flex: 1, padding: 5, borderRadius: 5 }}>
                            <Text style={{ color: "#fff", alignSelf: 'center', fontSize: 20, fontWeight: "bold" }}>REVOKE</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {singleMode && (
                    <TouchableOpacity onPress={printAction} style={{ marginTop: 20, alignSelf: "center", backgroundColor: "#f5f5f5", flex: 1, padding: 5, borderRadius: 7.5, width: "50%" }}>
                        <Text style={{ color: "#000", alignSelf: 'center', fontSize: 20, fontWeight: "bold" }}>SAVE IT</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}

export default CardQr