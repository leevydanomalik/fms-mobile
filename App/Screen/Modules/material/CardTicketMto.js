import React, { Component } from 'react'
import {View, Text, ScrollView, TouchableOpacity, Dimensions, Image} from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import {Colors} from '../../../Themes'
import {connect} from "react-redux"
import CardWarehouseRoute from '../../Components/CardWarehouseRoute'
import CardValidationGate from '../../Components/CardValidationGate'
import ButtonNext from '../../Components/ButtonNext'

class CardTicketMto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleGateScanner: false
        }
    }

    static defaultProps = {
        onPress: () => null
    }

    componentDidMount() {
        const {data} = this.props
        let datas = data.item
        console.log('data', datas.doc_info)
    }

    render() {
        const { visibleGateScanner } = this.state
        const {onPress, onScanner, id, collapse, data, objectID} = this.props
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
            pdt,
            material
        } = data.item.doc_info.delivery

        let shipto = {name: "", desc: ""}
        let billto = {name: "", desc: ""}
        let pickers = this.props.auth.user.data.userName

        shipto = {
            name: leg_origin ? leg_origin : '-',
            desc: leg_org_ATD ? leg_org_ATD : '-'
        }
        billto = {
            name: leg_dest ? leg_dest : '-',
            desc: leg_dest_ATA ? leg_dest_ATA : '-'
        }

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
            <View style={{paddingTop: id == 0 ? 5 : 15, padding: 15, paddingBottom: visibleGateScanner ? 20 : 0}}>
                {visibleGateScanner 
                ? (
                    <CardValidationGate 
                        title={'Start Material Transfer Order'}
                        subtitle={'Steps to follow'}
                        description={'To accomplish the process of material inbound by transporter must follow theses following instruction sequentially'}
                        multistep={[0, 1, 2, 3, 4, 5]}
                        multiDescription={'Driver License Checking, Fleet Commossioning Certificate Checking, Document Checking, Seal Number Checking. We also record time elapsed through out the process'}
                        buttonTitle={'Start Transfer Order'}
                        onPress={() => {
                            onScanner()
                            this.setState({visibleGateScanner: false})
                        }}
                        onBack={() => this.setState({visibleGateScanner: false})}
                    /> 
                ) : (
                    <TouchableOpacity 
                        onPress={() => this.setState({visibleGateScanner: true})} 
                        style={{
                            ...styles.container,
                            borderWidth: objectID === data.item.humanTaskID ? 3 : 0,
                            borderColor: objectID === data.item.humanTaskID ? Colors.mainPlaceholder : "transparent"
                        }}>
                        {!collapse ? (
                            <View style={{flex: 1, alignContent: "center"}}>
                                <View style={{flexDirection: "row", alignItems: "center", alignContent: "center"}}>
                                    <View style={{height: 45, width: 45, borderRadius: 100}}>
                                        <Image
                                            source={{uri: driver_img_path}}
                                            resizeMode="cover" style={{width: "100%", height: "100%", borderRadius: 100}}/>
                                    </View>
                                    <View style={{marginLeft: 10, alignContent: "center"}}>
                                        <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                            <Text style={{color: "#000", fontSize: 18, fontWeight: "bold", marginRight: 5}}>
                                                {driver_company ? driver_company : "-"}
                                            </Text>
                                            <FaIcon name="clock-o" color="#ccc" size={13}/>
                                            <Text style={{fontSize: 10, color: "#ccc", marginLeft: 5}}>
                                                {time ? time : "-"}
                                            </Text>
                                        </View>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "#999"
                                        }}>
                                            {
                                                (pdt) + ' - ' + 
                                                (pickers) + ' - ' + 
                                                (ticket_type.replace(/[_]/g, ' '))
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View style={{position: "absolute", top: 10, right: 0}}>
                                </View>
                                <View style={[styles.statusButton, {
                                    backgroundColor: ticketColor,
                                    position: "absolute",
                                    right: -10,
                                    top: -15
                                }]}>
                                    <Text style={{ color: labelColor, fontSize: 11, fontWeight: "bold" }}>{labelProgress}</Text>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <View style={{height: 45, width: 45, borderRadius: 100}}>
                                            <Image
                                                source={{uri: driver_img_path}}
                                                resizeMode="cover" style={{width: "100%", height: "100%", borderRadius: 100}}/>
                                        </View>
                                        <View style={{flex: 1, marginLeft: 10, justifyContent: "center"}}>
                                            <Text style={{color: "#000", fontSize: 18, fontWeight: "bold"}}>
                                                {driver_company ? driver_company : "-"}
                                            </Text>
                                            <Text style={{
                                                fontSize: 10,
                                                color: "#999"
                                            }}>
                                                {
                                                    (pdt) + ' - ' + 
                                                    (pickers) + ' - ' + 
                                                    (ticket_type.replace(/[_]/g, ' '))
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flex: 1, flexDirection: "row", position: "absolute", top: 0, right: 0}}>
                                        <FaIcon name="clock-o" color="#ccc" size={13}/>
                                        <Text style={{fontSize: 10, color: "#ccc", marginLeft: 5}}>
                                            {time ? time : "-"}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{
                                    marginTop: 20,
                                    marginBottom: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignContent: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{
                                        color: "#000",
                                        fontSize: 18,
                                        fontWeight: "bold"
                                    }}>{`Transfer Order #${ticket_ref_no}`}</Text>
                                    <View style={[styles.statusButton, {backgroundColor: ticketColor}]}>
                                        <Text style={{ color: labelColor, fontSize: 11, fontWeight: "bold" }}>{labelProgress}</Text>
                                    </View>
                                </View>

                                <Text style={{fontSize: 12, color: "#999"}}>
                                    {ticket_note ? ticket_note : "-"}
                                </Text>

                                <View style={{ marginTop: 20 }}>
                                    <CardWarehouseRoute 
                                        centerTitle={routeTitle ? routeTitle : '80 Box Mesran 80 UPC001 / 8 Pallet'}
                                        centerSubtitle={routeDesc ? routeDesc : 'Dummy Single Step (45m20s)'}
                                        start={{
                                            icon: "warehouse",
                                            title: shipto.name,
                                            subtitle: shipto.desc
                                        }}
                                        stop={{
                                            icon: "warehouse",
                                            title: billto.name,
                                            subtitle: billto.desc
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
    statusButton: {
        // width: 85,
        borderRadius: 5,
        padding: 10,
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainWhite
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardTicketMto)