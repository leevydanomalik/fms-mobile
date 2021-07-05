import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../../Themes'
import CardWarehouseRoute from '../Components/CardWarehouseRoute'
import CardValidationGate from '../Components/CardValidationGate'
import ButtonNext from '../Components/ButtonNext'

class CardTicketB extends Component {
    state = {
        visible: false,
        visibleGateScanner: false
    }

    static defaultProps = {
        onPress: () => null
    }

    componentDidMount() {
        const { role, data } = this.props
        console.log('data', data.item.status)
    }

    render() {
        const { visibleGateScanner } = this.state
        const { onPress, onScanner, id, collapse, role, data } = this.props
        let isGate = false
        let gateTitle = ''
        let btnTitle = ''
        let ttlMultiStep = []
        let stt = ''
        let sttColor = '#555'
        let sttBGColor = Colors.mainPlaceholder
        switch (data.item.status) {
            case 'IN_PROGRESS':
                stt = 'WIP'
                sttColor = '#fff'
                sttBGColor = Colors.mainWhite
                break
            case 'NOT_STARTED':
                stt = 'TODO'
                sttColor = '#555'
                sttBGColor = Colors.whiteGrey
                break
            case 'DONE':
                stt = 'DONE'
                sttColor = '#fff'
                sttBGColor = Colors.info
                break
            default:
                stt = 'NOT SET'
                break
        }
        switch (role) {
            case 'GR':
                gateTitle = 'Start checking Good Receipt'
                btnTitle = 'Scan Delivery Order'
                ttlMultiStep = [0, 1, 2, 3, 4, 5, 6]
                isGate = true
                break
            case 'GI':
                gateTitle = 'Start checking Good Issue'
                btnTitle = 'Scan Loading Order'
                ttlMultiStep = [0, 1, 2, 3, 4, 5]
                isGate = true
                break
            case 'FLD':
                gateTitle = 'Start checking Movement'
                btnTitle = 'Start scanning Driver QR'
                ttlMultiStep = [0, 1, 2, 3, 4, 5]
                isGate = true
                break
            case 'MATERIALMOVEMENT':
                gateTitle = 'Start Material Movement Order'
                btnTitle = 'START MOVEMENT ORDER'
                ttlMultiStep = [0, 1, 2, 3, 4, 5]
                isGate = true
                break
            case 'CYCLECOUNT':
                gateTitle = 'Start Cycle Count Order'
                btnTitle = 'START MOVEMENT ORDER'
                ttlMultiStep = [0, 1, 2, 3, 4, 5]
                isGate = true
                break
            default:
                isGate = false
                break
        }
        return (
            <View style={{ paddingTop: id == 0 ? 5 : 15, padding: 15, backgroundColor: "#fff", paddingBottom: visibleGateScanner ? 20 : 0 }}>
                {visibleGateScanner 
                ? (
                    <CardValidationGate 
                        title={gateTitle}
                        subtitle={'Steps to follow'}
                        description={'To accomplish the process of material inbound by transporter must follow theses following instruction sequentially'}
                        multistep={ttlMultiStep}
                        multiDescription={'Driver License Checking, Fleet Commossioning Certificate Checking, Document Checking, Seal Number Checking. We also record time elapsed through out the process'}
                        buttonTitle={btnTitle}
                        onPress={() => {
                            onScanner()
                            this.setState({visibleGateScanner: false})
                        }}
                        onBack={() => this.setState({visibleGateScanner: false})}
                    /> 
                ) : (
                    <TouchableOpacity 
                        onPress={() => (!isGate) ? onPress() : this.setState({visibleGateScanner: true})} 
                        style={styles.container}>
                        {!collapse ? (
                            <View style={{ flex: 1, alignContent: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center" }}>
                                    <View style={{ height: 45, width: 45, borderRadius: 100 }} >
                                        <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                                    </View>
                                    <View style={{ marginLeft: 10, alignContent: "center" }}>
                                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginRight: 5 }}>Inbound Manager</Text>
                                            <FaIcon name="clock-o" color="#ccc" size={13} />
                                            <Text style={{ fontSize: 10, color: "#ccc", marginLeft: 5 }}>1s Ago</Text>
                                        </View>
                                        <Text style={{ fontSize: 10, color: "#999" }}>22 Minutes ages - Deddy - Material Movement #303</Text>
                                    </View>
                                </View>
                                <View style={{position: "absolute", top: 10, right: 0}}>
                                    {/* <FaIcon name="angle-right" color="#ccc" size={30} /> */}
                                </View>
                                <View style={{ padding: 3.5, paddingLeft: 7.5, paddingRight: 7.5, backgroundColor: sttBGColor, alignItems: "center", borderRadius: 5, position: "absolute", right: -10, top: -10 }}>
                                    <Text style={{ color: sttColor, fontSize: 10, fontWeight: 'bold' }}>{stt}</Text>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ height: 45, width: 45, borderRadius: 100 }} >
                                            <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 10, justifyContent: "center" }}>
                                            <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>Inbound Manager</Text>
                                            <Text style={{ fontSize: 10, color: "#999" }}>22 Minutes ages - Deddy - Material Movement #303</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row", position: "absolute", top: 0, right: 0 }}>
                                        <FaIcon name="clock-o" color="#ccc" size={13} />
                                        <Text style={{ fontSize: 10, color: "#ccc", marginLeft: 5 }}>1s Ago</Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between" }}>
                                    <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>{role == "GI" || role == "GR" ? "Delivery Order DO#86868868" : "Transfer Order PO#85885938"}</Text>
                                    <TouchableOpacity style={{ padding: 3.5, paddingLeft: 7.5, paddingRight: 7.5, backgroundColor: sttBGColor, alignItems: "center", borderRadius: 5, position: "absolute", right: 0, bottom: 0 }}>
                                        <Text style={{ color: sttColor, fontSize: 10, fontWeight: 'bold' }}>{stt}</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontSize: 15, marginTop: 5, color: "#999", fontSize: 12 }}>
                                    This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master
                                </Text>

                                <View style={{ marginTop: 20 }}>
                                    <CardWarehouseRoute 
                                        centerTitle={'80 Box Mesran 80 UPC001 / 8 Pallet'}
                                        centerSubtitle={'Single Step (45m20s)'}
                                        start={{
                                            icon: "warehouse",
                                            title: "LGN Nusantara",
                                            subtitle: "23 March 2010 19:00 PM"
                                        }}
                                        stop={{
                                            icon: "warehouse",
                                            title: "DSP Panjang",
                                            subtitle: "24 March 2010 19:00 PM"
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <ButtonNext title={'Ticket#86886868'} onPress={() => (!isGate) ? onPress() : this.setState({visibleGateScanner: true})} />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}

const styles = {
    container: { 
        backgroundColor: "#fff", 
        marginBottom: 15, 
        padding: 15, 
        paddingTop: 20, 
        paddingBottom: 20, 
        borderRadius: 7.5, 
        elevation: 5 
    }
}

export default CardTicketB