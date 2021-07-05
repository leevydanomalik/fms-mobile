import React from 'react'
import { Dialog } from 'react-native-simple-dialogs'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Styles, Colors } from '../../Themes'

class DialogQrInvalid extends React.Component {
    render() {
        const { navigation, close, action } = this.props
        return (
            <Dialog
                onTouchOutside={close}
                visible={true}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={action} style={{ position: "absolute", top: -10, left: 0 }}>
                        <Icon name="close" color="#ccc" size={30} />
                    </TouchableOpacity>
                    
                    <View style={{ height: 200, width: 150, alignItems: "center", justifyContent: "center", marginTop: 15, marginBottom: 15 }}>
                        <Image source={require('../../assets/qr-scan-illustration.png')} resizeMode="contain" style={{ width: '100%' }} />
                    </View>

                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 22 }}>This QR code is invalid</Text>
                    <Text style={{ color: "#000", marginTop: 5 }}>Please scan another one.</Text>

                    <TouchableOpacity onPress={action} style={{ padding: 10, backgroundColor: Colors.main, marginTop: 15, width: "100%", alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 16, fontFamily: "sans-serif-medium" }}>Try Again</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            close()
                            navigation ? navigation.goBack() : null
                        }} 
                        style={{ padding: 10, marginTop: 10, width: "100%", alignItems: "center" }}>
                        <Text style={{ color: "#0072ff", fontSize: 16, fontFamily: "sans-serif-medium" }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Dialog>
        )
    }
}

export default DialogQrInvalid