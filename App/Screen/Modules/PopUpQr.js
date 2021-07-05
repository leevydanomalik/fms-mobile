import React from 'react'
import { Dialog } from 'react-native-simple-dialogs'
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import QRCode from 'react-native-qrcode-svg'

class PopUpQr extends React.Component {
    render() {
        const { navigation, close, action, data } = this.props
        return (
            <Dialog
                dialogStyle={{ borderRadius: 10 }}
                onTouchOutside={close}
                visible={true}>
                <TouchableOpacity onPress={close} style={{ position: "absolute", right: 15 }}>
                    {/* <Icon name="ios-close" color="#ccc" size={40} /> */}
                </TouchableOpacity>
                <View style={{ alignItems: 'center', paddingTop: 15 }}>
                    <QRCode size={200} value={"B29228PPK"} />
                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 22, marginTop: 10 }}>{data.title}</Text>
                    <Text style={{ color: "#000", marginTop: 5 }}>{data.id}</Text>
                </View>
            </Dialog>
        )
    }
}

export default PopUpQr