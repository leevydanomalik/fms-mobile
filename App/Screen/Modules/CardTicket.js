import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../Themes'
import CardWarehouseRoute from '../Components/CardWarehouseRoute'
import CardValidationGate from '../Components/CardValidationGate'
import ButtonNext from '../Components/ButtonNext'

class CardTicket extends Component {
    state = {
        visible: false,
        visibleGateScanner: false
    }

    static defaultProps = {
        onPress: () => null,
    }

    componentDidMount() {}

    render() {
        const { data, onPress, onScanner, id, collapse, role } = this.props
        const { ticketNumber, transportVendor, fleetType, fleetMfg, fleetMfgType, driverName, driverLicense, licensePlate, opsType, poNumber, descNote, dlvDate, status, progress } = data.item
        let ticketColor
        let imageProgress
        let labelProgress
        let labelColor = '#fff'
        const isGate = role === 'GATE' || role === 'DRIVER' || role === 'LUM' ? true : false
        const { visibleGateScanner } = this.state
        const dummy = [0, 1, 2, 3, 4]

        switch (status) {
            case "NOT_STARTED":
                ticketColor = Colors.whiteGrey
                imageProgress = require('../../assets/not_started.png')
                labelProgress = 'Todo'
                labelColor = '#555'
                break
            case "IN_PROGRESS":
                ticketColor = Colors.mainWhite
                imageProgress = require('../../assets/in_progress.png')
                labelProgress = 'WIP'
                break
            case "DONE":
                ticketColor = Colors.info
                imageProgress = require('../../assets/done.png')
                labelProgress = 'Done'
                break
            default:
                ticketColor = "#000"
                imageProgress = require('../../assets/logo-patlog.png')
                labelProgress = ''
                break
        }
        return (
            <View style={{ paddingTop: id == 0 ? 5 : 15, padding: 15, backgroundColor: "#fff", paddingBottom: visibleGateScanner ? 20 : 0 }}>
                {visibleGateScanner 
                ? (
                    <CardValidationGate 
                        title={'Start checking driver & fleet data'}
                        subtitle={'Steps to follow'}
                        description={'To accomplish the process of material inbound by transporter must follow theses following instruction sequentially'}
                        multistep={role === "GATE" ? [0, 1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5]}
                        multiDescription={'Driver License Checking, Fleet Commossioning Certificate Checking, Document Checking, Seal Number Checking. We also record time elapsed through out the process'}
                        buttonTitle={'Start Scanning Driver QR'}
                        onPress={() => {
                            onScanner()
                            this.setState({visibleGateScanner: false})
                        }}
                        onBack={() => this.setState({visibleGateScanner: false})}
                    /> 
                ) : (
                    <TouchableOpacity
                        onPress={() => (!isGate) ? onPress() : this.setState({visibleGateScanner: true})}
                        style={[styles.container, { backgroundColor: !collapse ? isGate ? ticketColor : '#fff' : '#fff' }]}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ height: 40, width: 40, borderRadius: 100 }} >
                                <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                            </View>
                            <View style={{ marginLeft: 10, justifyContent: 'center', width: "80%" }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{transportVendor ? transportVendor : 'PT. Sentral Cargo GmBh'}</Text>
                                <Text style={{ flex: 1, fontSize: 10, marginTop: 5 }}>{
                                    (fleetType ? fleetType : 'Flatwing') + ' - ' + 
                                    (licensePlate ? licensePlate : 'B2434AAA') + ' - ' + 
                                    (driverName ? driverName : 'Mr.Driver') + '/' + 
                                    (driverLicense ? driverLicense : 'B2')  + ' - ' + 
                                    (opsType ? opsType : 'INBOUND')
                                }</Text>
                            </View>
                            {!collapse ? (
                                <View style={{ position: 'absolute', right: 0, flexDirection: "row", alignItems: "center" }}>
                                    <FaIcon name={"angle-right"} size={30} />
                                </View>
                            ) : (
                                <View style={{ position: 'absolute', right: 0, flexDirection: "row", alignItems: "center" }}>
                                    <Icon name={"clockcircleo"} size={12} color={'#999'} />
                                    <Text style={{ fontSize: 10, color: '#999', marginLeft: 5 }}>1s Ago</Text>
                                </View>
                            )}
                        </View>
                        {!isGate && collapse && (
                            <View>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16, marginTop: 15, marginBottom: 10 }}>{'Outbound Delivery PO#' + poNumber}</Text>
                                <Text style={{ fontSize: 12 }}>{descNote}</Text>
                                <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 0 }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <View style={{ height: 150, width: 150, borderWidth: 5, borderRadius: 100, borderColor: "#ccc" }}>
                                            <Image style={{ height: "100%", width: "100%", borderRadius: 100 }} resizeMode="contain" source={{ uri: "https://pngimage.net/wp-content/uploads/2018/05/caminhão-em-png-2.png" }} />
                                        </View>
                                        <Text style={{ color: "#000", fontSize: 16 }}>{fleetMfg}</Text>
                                        <Text style={{ color: "#000", fontSize: 10 }}>{fleetMfgType}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <View style={{ height: 150, width: 150, borderWidth: 5, borderRadius: 100, borderColor: "#ccc" }}>
                                            <Image style={{ height: "100%", width: "100%", borderRadius: 100 }} resizeMode="contain" source={{ uri: "https://pbs.twimg.com/profile_images/932462975679586304/EbbRb6Ne_400x400.jpg" }} />
                                        </View>
                                        <Text style={{ color: "#000", fontSize: 16 }}>PT. Sentral Cargo GmBh</Text>
                                        <Text style={{ color: "#000", fontSize: 10 }}>Protos 9890MZ</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 30, marginBottom: 10, borderColor: "#ccc", borderWidth: 1, alignItems: "center", padding: 10, borderRadius: 10 }}>
                                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>{'Ticket#' + (ticketNumber ? ticketNumber : '86868868')}</Text>
                                </View>
                            </View>
                        )}
                        {isGate && collapse && (
                            <View>
                                <View style={{flext: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 10, color: "#999", marginBottom: 5 }}>INBOUND DELIVERY</Text>
                                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868868</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 10, color: "#999", marginBottom: 5 }}>YARD AND DOCK</Text>
                                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Y001/D5</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                            {dummy.map((dt, index) => {
                                                return (
                                                    <FaIcon key={index} name={"star"} size={14} color={styles.voteColor} style={styles.voteStyles} />
                                                )
                                            })}
                                        </View>
                                        <View style={[styles.statusButton, {backgroundColor: ticketColor}]}>
                                            <Text style={{ color: labelColor, fontSize: 11, fontWeight: "bold" }}>{labelProgress} ({progress})</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 30 }}>
                                    <CardWarehouseRoute 
                                        centerTitle={'80 Box Mesran 80 UPC001 / 8 Pallet'}
                                        centerSubtitle={'Single Step (45m20s)'}
                                        start={{
                                            icon: "warehouse",
                                            title: "GR Staging #678",
                                            subtitle: "23 March 2010 19:00 PM"
                                        }}
                                        stop={{
                                            icon: "warehouse",
                                            title: "VNA Staging #768",
                                            subtitle: "24 March 2010 19:00 PM"
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <ButtonNext title={'Ticket#' + (ticketNumber ? ticketNumber : '86868868')} onPress={() => (!isGate || role === 'DRIVER') ? onPress() : this.setState({visibleGateScanner: true})} />
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
    },
    voteStyles: {
        marginLeft: 1, marginRight: 1
    },
    voteColor: '#fdb813',
    statusButton: {
        borderRadius: 5,
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainWhite
    }
}

export default CardTicket