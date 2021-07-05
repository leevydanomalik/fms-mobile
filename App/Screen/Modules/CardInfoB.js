import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { Styles, Colors } from '../../Themes'
import QRCode from 'react-native-qrcode-svg'

const blue = "#0e74ff"

class CardInfoB extends React.Component {
    // constructor(props) {
    //     super(props)
    //     const { params } = props.navigation.state
    //     this.state = {}
    // }
    
    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { onVerifiedPress } = this.props
        return (
            <View>
                {(
                    <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Order By</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <FaIcon name="clock-o" color="#ccc" size={13} />
                                <Text style={{ fontSize: 10, color: "#ccc", marginLeft: 5 }}>1s Ago</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                                <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Manager</Text>
                                <Text style={{ fontSize: 10 }}>Material Movement #303</Text>
                            </View>
                        </View>
                    </View>
                )}

                {(
                    <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Operator</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                                <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Partijo</Text>
                                <Text style={{ fontSize: 10 }}>FORKLIFT DRIVER</Text>
                            </View>
                            <TouchableOpacity onPress={onVerifiedPress}>
                                <View style={{ borderWidth: 2, borderColor: Colors.main, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
                                    <QRCode size={42} value={"B29228PPK"} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 12, marginTop: 5, color: "#999" }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                )}

                {(
                    <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Origin</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ height: 50, width: 50, borderRadius: 100, alignItems: "center", justifyContent: "center" }} >
                                <FaIcon name="shield" size={50} color="#000" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>HU02928282</Text>
                                <Text style={{ fontSize: 10 }}>WAREHOUSE-001</Text>
                            </View>
                            <TouchableOpacity onPress={onVerifiedPress}>
                                <View style={{ borderWidth: 2, borderColor: Colors.main, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
                                    <QRCode size={42} value={"B29228PPK"} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 12, marginTop: 5, color: "#999" }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                )}

                {(
                    <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Material</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ height: 50, width: 50, borderRadius: 0 }} >
                                <Image source={{ uri: "https://s.blanja.com/picspace/16/132112/800.800_47b705a86fa14b2bb2a34c908015e4e0.jpg_800x800.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>A884747774</Text>
                                <Text style={{ fontSize: 10 }}>MESRAN PRONAS 20L</Text>
                                <Text style={{ fontSize: 10 }}>300 BOX </Text>
                            </View>
                            <TouchableOpacity onPress={onVerifiedPress}>
                                <View style={{ borderWidth: 2, borderColor: Colors.error, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
                                    <QRCode size={42} value={"B29228PPK"} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 12, marginTop: 5, color: "#999" }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                )}

                {(
                    <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Destination</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View style={{ height: 50, width: 50, borderRadius: 100, alignItems: "center", justifyContent: "center" }} >
                                <FaIcon name="trash-o" size={50} color="#000" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>XU0988888</Text>
                                <Text style={{ fontSize: 10 }}>WAREHOUSE-001</Text>
                            </View>
                            <TouchableOpacity onPress={onVerifiedPress}>
                                <View style={{ borderWidth: 2, borderColor: Colors.main, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
                                    <QRCode size={42} value={"B29228PPK"} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 12, marginTop: 5, color: "#999" }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                )}
                {/* <View style={{ flexDirection: "row" }}>
                    <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                        <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Manager</Text>
                        <Text style={{ fontSize: 10 }}>22 Minutes ages - Deddy - Material Movement #303</Text>
                    </View>
                </View>

                <View style={{ marginTop: 5 }}>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Loading Order PO#85885938</Text>
                    <TouchableOpacity style={{ width: 80, backgroundColor: blue, alignItems: "center", borderRadius: 2, position: "absolute", right: 0, bottom: 5 }}>
                        <Text style={{ color: "#fff", fontSize: 10 }}>VERIFIED</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 10, marginTop: 5 }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>

                <View style={{ marginTop: 10, flexDirection: "row" }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 50 }}>
                        <FaIcon color="#ccc" size={25} name="th" />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', position: 'absolute', top: 0, color: "#000", fontSize: 12 }}>80 Box Mesran 80 UPC001 / 8 Pallet</Text>
                        <Text style={{ alignSelf: 'center', position: 'absolute', bottom: 0, fontSize: 10 }}>Single Step (45m20s)</Text>
                        <FaIcon size={20} color="#ccc" name="caret-right" style={{ position: "absolute", alignSelf: 'center' }} />
                        <View style={{ width: '100%', height: 1, backgroundColor: "#ccc" }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 50 }}>
                        <FaIcon size={25} name="th" color="#ccc" />
                    </View>
                </View>

                <View style={{ marginTop: 10, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }}>LGN Nusantara</Text>
                        <Text style={{ fontSize: 10 }}>23 March 2010 19:00 PM</Text>
                        <TouchableOpacity style={{ width: 80, backgroundColor: blue, alignItems: "center", borderRadius: 2, marginTop: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 10 }}>VERIFIED</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }}>DSP Panjang</Text>
                        <Text style={{ fontSize: 10 }}>23 March 2010 19:00 PM</Text>
                        <TouchableOpacity style={{ width: 80, backgroundColor: blue, alignItems: "center", borderRadius: 2, marginTop: 5 }}>
                            <Text style={{ color: "#fff", fontSize: 10 }}>VERIFIED</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </View>
        )
    }
}

export default CardInfoB