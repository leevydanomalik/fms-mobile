import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
const blue = "#0e74ff"

class CardInfo extends React.Component {
    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { onVerifiedPress } = this.props
        return (
            <View>
                <View style={{ flexDirection: "row", padding: 20, backgroundColor: "#fff" }}>
                    <View style={{ height: 80, width: 80, borderRadius: 100 }} >
                        <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                    </View>

                    <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Leevy D. Malik</Text>
                        <Text style={{ fontSize: 14 }}>Arrived at 12.00PM</Text>
                        <Text style={{ color: "#000" }}>ALCARGO Logistica</Text>
                        <Text style={{ fontSize: 10 }}>B2UMUM - B6789876 - Flatwing - INBOUND</Text>
                        <View style={{ width: 80, position: "absolute", right: 0, alignItems: "center", top: 0 }}>
                            <TouchableOpacity onPress={onVerifiedPress} style={{ width: '100%', backgroundColor: blue, alignItems: "center", borderRadius: 2 }}>
                                <Text style={{ color: "#fff", fontSize: 10 }} >VERIFIED</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 10 }}>LIC#1291212</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: "#fff", flexDirection: 'row', paddingBottom: 20 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ height: 150, width: 150, borderWidth: 5, borderRadius: 100, borderColor: "#ccc" }}>
                            <Image style={{ height: "100%", width: "100%", borderRadius: 100 }} resizeMode="contain" source={{ uri: "https://pngimage.net/wp-content/uploads/2018/05/caminhão-em-png-2.png" }} />
                        </View>
                        <Text style={{ color: "#000", fontSize: 16 }}>Mercedes-Benz</Text>
                        <Text style={{ color: "#000", fontSize: 10 }}>Protos 9890MZ</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ height: 150, width: 150, borderWidth: 5, borderRadius: 100, borderColor: "#ccc" }}>
                            <Image style={{ height: "100%", width: "100%", borderRadius: 100 }} resizeMode="contain" source={{ uri: "https://pbs.twimg.com/profile_images/932462975679586304/EbbRb6Ne_400x400.jpg" }} />
                        </View>    
                        <Text style={{ color: "#000", fontSize: 16 }}>PT. Sentral Cargo GmBh</Text>
                        <Text style={{ color: "#000", fontSize: 10 }}>Protos 9890MZ</Text>
                    </View>
                </View>

            </View>
        )
    }
}

export default CardInfo