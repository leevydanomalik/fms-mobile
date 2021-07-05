import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../../Themes'
import CardWarehouseRoute from '../../Components/CardWarehouseRoute'
import CardValidationGate from '../../Components/CardValidationGate'
import CardStars from '../../Components/CardStars'
import ButtonNext from '../../Components/ButtonNext'

class CardTicket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            visibleGateScanner: false,
            ticket: {},
            info: '',
            step: ''
        }
    }

    static defaultProps = {
        onPress: () => null,
    }

    componentDidMount() {
        // const { data } = this.props
        // console.log('componentDidMount', data.item.ticket_info)
    }

    render() {
        const { data, onPress, onScanner, id, collapse, role, objectID } = this.props
        const { visibleGateScanner } = this.state
        const { 
            ticket_no,
            ticket_type,
            ticket_ref_no,
            ticket_priority,
            ticket_note,
            driver_img_path,
            driver_company,
            driver_name,
            driver_drv_lic,
            fleet_type,
            fleet_lic_plate,
            fleet_YND,
            leg_origin,
            leg_org_ATD,
            leg_dest,
            leg_dest_ATA,
            status,
            time,
            progress
        } = data.item.ticket_info
        const { 
            delivery 
        } = data.item.doc_info
        const {
            material
        } = delivery
        const isGate = true

        let ticketColor
        let labelProgress
        let labelColor = '#fff'

        let routeTitle = ''
        let routeDesc = ''
        let materialName = ''
        let materialUom = ''
        let materialHUNo = ''
        let totalHU = 0

        material && material.map((dt) => {
            materialName = dt.name
            materialUom = dt.uom
            materialHUNo = dt.hu_no
            totalHU += dt.hu_cap
            return null
        })

        routeTitle = totalHU + ' ' +  materialUom +' ' + materialName + ' ' + materialHUNo

        switch (status) {
            case "NOT_STARTED":
                ticketColor = Colors.whiteGrey
                labelProgress = 'Todo'
                labelColor = '#555'
                break
            case "STARTED":
                ticketColor = Colors.whiteGrey
                labelProgress = 'Started'
                labelColor = '#555'
                break
            case "WIP":
                ticketColor = Colors.mainWhite
                labelProgress = 'WIP'
                break
            case "DONE":
                ticketColor = Colors.info
                labelProgress = 'Done'
                break
            default:
                ticketColor = "red"
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
                        style={[
                            styles.container, 
                            { 
                                backgroundColor: !collapse ? isGate ? ticketColor : '#fff' : '#fff',
                                borderWidth: objectID === data.item.humanTaskID ? 3 : 0, 
                                borderColor: objectID === data.item.humanTaskID ? Colors.mainPlaceholder : "transparent"
                            }
                        ]}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ height: 40, width: 40, borderRadius: 100 }} >
                                <Image 
                                    source={{ uri: driver_img_path }} 
                                    resizeMode="cover" 
                                    style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                            </View>
                            <View style={{ marginLeft: 10, justifyContent: 'center', width: "80%" }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                                    {driver_company ? driver_company : "-"}
                                </Text>
                                <Text style={{ flex: 1, fontSize: 10, marginTop: 5 }}>{
                                    (fleet_type) + ' - ' + 
                                    (fleet_lic_plate) + ' - ' + 
                                    (driver_name) + '/' + 
                                    (driver_drv_lic)  + ' - ' + 
                                    (ticket_type.replace(/[_]/g, ' '))
                                }</Text>
                            </View>
                            {!collapse ? (
                                <View style={{ position: 'absolute', right: 0, flexDirection: "row", alignItems: "center" }}>
                                    <FaIcon name={"angle-right"} size={30} />
                                </View>
                            ) : (
                                <View style={{ position: 'absolute', right: 0, flexDirection: "row", alignItems: "center" }}>
                                    <Icon name={"clockcircleo"} size={12} color={'#999'} />
                                    <Text style={{ fontSize: 10, color: '#999', marginLeft: 5 }}>
                                        {time}
                                    </Text>
                                </View>
                            )}
                        </View>
                        {isGate && collapse && (
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 10, color: "#999", marginBottom: 5 }}>INBOUND DELIVERY</Text>
                                        <Text style={{ color: "#000", fontSize: 14, fontWeight: "bold" }}>{ticket_ref_no}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 10, color: "#999", marginBottom: 5 }}>YARD AND DOCK</Text>
                                        <Text style={{ color: "#000", fontSize: 14, fontWeight: "bold" }}>{fleet_YND}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, alignItems: "center" }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                            <CardStars periority={ticket_priority} />
                                        </View>
                                        <View style={[styles.statusButton, {backgroundColor: ticketColor}]}>
                                            <Text style={{ color: labelColor, fontSize: 10, fontWeight: "bold" }}>{labelProgress} ({progress})</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 30 }}>
                                    <CardWarehouseRoute 
                                        centerTitle={routeTitle ? routeTitle : '80 Box Mesran 80 UPC001 / 8 Pallet'}
                                        centerSubtitle={ routeDesc ? routeDesc : 'Dummy Single Step (45m20s)'}
                                        start={{
                                            icon: "warehouse",
                                            title: leg_origin ? leg_origin : '-',
                                            subtitle: leg_org_ATD ? leg_org_ATD : '-'
                                        }}
                                        stop={{
                                            icon: "warehouse",
                                            title: leg_dest ? leg_dest : '-',
                                            subtitle: leg_dest_ATA ? leg_dest_ATA : '-'
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <ButtonNext 
                                        title={'Ticket#' + (ticket_no)} 
                                        onPress={() => this.setState({visibleGateScanner: true})} />
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
        width: 85,
        borderRadius: 5,
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainWhite
    }
}

export default CardTicket