import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../Themes'
import CardWarehouseRoute from './CardWarehouseRoute'
import CardValidationGate from './CardValidationGate'
import CardStars from './CardStars'
import ButtonNext from './ButtonNext'
import { generateUrlPhoto } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'

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

    componentDidMount() {}

    render() {
        const { data, onPress, onScanner, id, collapse, disableGate, role, dataValidate, disableScanner, objectID } = this.props
        const { visibleGateScanner } = this.state
        const btnType = data.item && data.item.card_style && data.item.card_style.button_type
        const type = data.item && data.item.card_style && data.item.card_style.card_type
        const { 
            ticket_date,
            ticket_no,
            ticket_type,
            ticket_ref_no,
            ticket_priority,
            ticket_company,
            driver_name,
            driver_drv_lic,
            fleet_type,
            fleet_lic_plate,
            fleet_YND,
            time,
            status,
            progress
        } = data.item.ticket_info
        const { 
            delivery 
        } = data.item.doc_info
        const {
            material,
            leg_origin,
            leg_org_ETD,
            leg_dest,
            leg_dest_ETA,
        } = delivery
        const isGate = disableGate

        let ticketColor
        let labelProgress
        let labelCountProgress = progress
        let labelColor = '#fff'
        let buttonTitle = dataValidate && dataValidate.buttonTitle

        let routeTitle = ''
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
            case "TODO":
                ticketColor = Colors.orange
                labelProgress = 'Todo'
                labelColor = '#555'
                break
            case "STARTED":
                ticketColor = 'red'
                labelProgress = 'Started'
                labelColor = '#fff'
                buttonTitle = 'RESUME CURRENT TASK'
                break
            case "WIP":
                ticketColor = Colors.mainWhite
                labelProgress = 'WIP'
                break
            case "DONE":
                ticketColor = Colors.whiteGrey
                labelProgress = 'Done'
                labelColor = '#555'
                buttonTitle = 'VIEW DETAIL'
                break
            default:
                ticketColor = "#fff"
                labelColor = '#555'
                labelProgress = 'UNSET'
                labelCountProgress = '0/0'
                break
        }
        return (
            <View style={{ paddingTop: id == 0 ? 5 : 15, padding: 15, backgroundColor: "#fff", paddingBottom: visibleGateScanner ? 20 : 0 }}>
                {visibleGateScanner 
                ? (
                    <CardValidationGate 
                        title={dataValidate ? dataValidate.title : ''}
                        subtitle={dataValidate ? dataValidate.subtitle : ''}
                        description={dataValidate ? dataValidate.description : ''}
                        multistep={dataValidate ? dataValidate.multistep : []}
                        multiDescription={dataValidate ? dataValidate.multiDescription : ''}
                        buttonTitle={buttonTitle ? buttonTitle : ''}
                        onPress={() => {
                            disableScanner ? onPress() : data.item.ticket_info.status === "TODO" ? onScanner() : onPress()
                            this.setState({visibleGateScanner: false})
                        }}
                        onBack={() => this.setState({visibleGateScanner: false})}
                    /> 
                ) : (
                    <TouchableOpacity
                        onPress={() => (isGate) ? onPress() : this.setState({visibleGateScanner: true})}
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
                                <ProgressiveImage
                                    resizeMode="cover" 
                                    style={{ 
                                        borderRadius: 100, 
                                        width: "100%", 
                                        height: "100%",
                                        backgroundColor: Colors.whiteGrey
                                    }}
                                    sizeSpinner={20}
                                    source={{
                                        uri: generateUrlPhoto(data.item.user_info && data.item.user_info.uID),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                        }
                                    }} />
                            </View>
                            <View style={{ marginLeft: 10, justifyContent: 'center', width: "80%" }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {ticket_company ? ticket_company : "-"}
                                </Text>
                                <Text style={{ flex: 1, fontSize: 10, marginTop: 5, textTransform: "uppercase" }}>{
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
                                        {ticket_date ? ticket_date : time}
                                    </Text>
                                </View>
                            )}
                        </View>
                        {collapse && (
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 10, color: Colors.lightGrey, marginBottom: 5, textTransform: 'uppercase' }}>{type ? type : 'INBOUND DELIVERY'}</Text>
                                        <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>{ticket_ref_no}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 10, color: Colors.lightGrey, marginBottom: 5, textTransform: 'uppercase' }}>YARD AND DOCK</Text>
                                        <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>{fleet_YND}</Text>
                                    </View>
                                    <View style={{ flex: 0.5, alignItems: "center" }}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                            <CardStars periority={ticket_priority} />
                                        </View>
                                        <View style={[styles.statusButton, {backgroundColor: ticketColor}]}>
                                            <Text style={{ color: labelColor, fontSize: 10, fontWeight: "bold", textTransform: "uppercase" }}>{labelProgress}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 30 }}>
                                    <CardWarehouseRoute 
                                        centerTitle={''}
                                        centerSubtitle={''}
                                        start={{
                                            icon: "warehouse",
                                            title: leg_origin ? leg_origin : '-',
                                            subtitle: leg_org_ETD ? leg_org_ETD : '-'
                                        }}
                                        stop={{
                                            icon: "warehouse",
                                            title: leg_dest ? leg_dest : '-',
                                            subtitle: leg_dest_ETA ? leg_dest_ETA : '-'
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <ButtonNext 
                                        title={'Ticket#' + (ticket_no)} 
                                        type={btnType ? btnType : 'main'}
                                        onPress={() => (isGate) ? onPress() : this.setState({visibleGateScanner: true})} 
                                    />
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
        marginTop: 3,
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainWhite,
        borderColor: Colors.lightGrey,
        borderWidth: 0.5
    }
}

export default CardTicket