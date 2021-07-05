import React, { Component } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import {Colors} from '../../Themes'
import {connect} from "react-redux"
import CardWarehouseRoute from './CardWarehouseRoute'
import CardValidationGate from './CardValidationGate'
import ButtonNext from './ButtonNext'
import { generateUrlPhoto } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'

class CardTicketB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleGateScanner: false
        }
    }

    static defaultProps = {
        onPress: () => null
    }

    componentDidMount() {}

    render() {
        const { visibleGateScanner } = this.state
        const {onPress, onScanner, id, collapse, data, dataValidate, disableGate, disableScanner, objectID} = this.props
        const btnTitle = data.item && data.item.card_style && data.item.card_style.button_title
        const btnType = data.item && data.item.card_style && data.item.card_style.button_type
        const type = data.item && data.item.card_style && data.item.card_style.card_type
        const disable_route = data.item && data.item.card_style && data.item.card_style.disable_route
        const { 
            ticket_date,
            ticket_no,
            ticket_type,
            ticket_ref_no,
            ticket_note,
            ticket_company,
            status,
            time
        } = data.item.ticket_info
        const {
            pdt,
            material,
            leg_origin,
            leg_org_ETD,
            leg_dest,
            leg_dest_ETA,
        } = data.item.doc_info.delivery

        const isGate = disableGate

        let shipto = {name: "", desc: ""}
        let billto = {name: "", desc: ""}
        let pickers = this.props.auth.user.data.userName

        shipto = {
            name: leg_origin ? leg_origin : '-',
            desc: leg_org_ETD ? leg_org_ETD : '-'
        }
        billto = {
            name: leg_dest ? leg_dest : '-',
            desc: leg_dest_ETA ? leg_dest_ETA : '-'
        }

        let ticketColor
        let labelProgress
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
                break
        }

        return (
            <View style={{paddingTop: id == 0 ? 5 : 15, padding: 15, paddingBottom: visibleGateScanner ? 20 : 0}}>
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
                            disableScanner ? onPress() : onScanner()
                            this.setState({visibleGateScanner: false})
                        }}
                        onBack={() => this.setState({visibleGateScanner: false})}
                    /> 
                ) : (
                    <TouchableOpacity 
                        onPress={() => (isGate) ? onPress() : this.setState({visibleGateScanner: true})} 
                        style={{
                            ...styles.container,
                            borderWidth: objectID === data.item.humanTaskID ? 3 : 0,
                            borderColor: objectID === data.item.humanTaskID ? Colors.mainPlaceholder : "transparent"
                        }}>
                        {!collapse ? (
                            <View style={{flex: 1, alignContent: "center"}}>
                                <View style={{flex: 1, flexDirection: "row", alignItems: "center", alignContent: "center"}}>
                                    <View style={{height: 45, width: 45, borderRadius: 100}}>
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
                                    <View style={{flex: 1, marginLeft: 10, alignContent: "center"}}>
                                        <View style={{flex: 1, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}}>
                                            <View style={{flex: 1}}>
                                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold", marginRight: 5}}>
                                                    {ticket_company ? ticket_company : "-"}
                                                </Text>
                                            </View>
                                            <View style={[styles.statusButton, {backgroundColor: ticketColor}]}>
                                                <Text style={{ color: labelColor, fontSize: 11, fontWeight: "bold", textTransform: 'uppercase' }}>{labelProgress}</Text>
                                            </View>
                                            {/* <View style={{flexDirection: 'row', marginTop: 7}}>
                                                <FaIcon name="clock-o" color="#ccc" size={13}/>
                                                <Text style={{fontSize: 10, color: "#ccc", marginLeft: 5}}>
                                                    {ticket_date ? ticket_date : time}
                                                </Text>
                                            </View> */}
                                        </View>
                                        <Text style={{
                                            fontSize: 10,
                                            color: Colors.lightGrey,
                                            textTransform: "uppercase"
                                        }}>
                                            {
                                                (pdt) + ' - ' + 
                                                (pickers) + ' - ' + 
                                                (ticket_type.replace(/[_]/g, ' '))
                                            }
                                        </Text>
                                    </View>
                                </View>
                                {/* <View style={[styles.statusButton, {backgroundColor: ticketColor, position: "absolute", right: 0, top: -15}]}>
                                    <Text style={{ color: labelColor, fontSize: 11, fontWeight: "bold", textTransform: 'uppercase' }}>{labelProgress}</Text>
                                </View> */}
                            </View>
                        ) : (
                            <View>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <View style={{height: 45, width: 45, borderRadius: 100}}>
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
                                        <View style={{flex: 1, marginLeft: 10, justifyContent: "center"}}>
                                            <Text style={{color: Colors.black, fontSize: 16, fontWeight: "bold", marginBottom: 5}}>
                                                {ticket_company ? ticket_company : "-"}
                                            </Text>
                                            <Text style={{
                                                fontSize: 10,
                                                color: Colors.lightGrey,
                                                textTransform: "uppercase"
                                            }}>
                                                {
                                                    (pdt) + ' - ' + 
                                                    (pickers) + ' - ' + 
                                                    (ticket_type.replace(/[_]/g, ' '))
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{flex: 1, flexDirection: "row", position: "absolute", top: -15, right: 0}}>
                                        <FaIcon name="clock-o" color="#ccc" size={13}/>
                                        <Text style={{fontSize: 10, color: "#ccc", marginLeft: 5}}>
                                            {ticket_date ? ticket_date : time}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{
                                    flex: 1,
                                    marginTop: 20,
                                    marginBottom: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignContent: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <View style={{flex: 1}}>
                                        <Text style={{
                                            color: Colors.black,
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            textTransform: "uppercase"
                                        }}>
                                            {`${type ? type : "Transfer Order"} #${ticket_ref_no}`}
                                        </Text>
                                    </View>
                                    <View style={[styles.statusButton, {backgroundColor: ticketColor}]}>
                                        <Text style={{ color: labelColor, fontSize: 11, fontWeight: "bold", textTransform: 'uppercase' }}>{labelProgress}</Text>
                                    </View>
                                </View>

                                <Text style={{fontSize: 12, color: Colors.lightGrey}}>
                                    {ticket_note ? ticket_note : "-"}
                                </Text>

                                {!disable_route && (
                                    <View style={{ marginTop: 20 }}>
                                        <CardWarehouseRoute 
                                            centerTitle={''}
                                            centerSubtitle={''}
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
                                )}

                                <View style={{ marginTop: 20 }}>
                                    <ButtonNext 
                                        title={btnTitle ? btnTitle : ('Ticket#' + (ticket_no))} 
                                        type={btnType ? btnType : 'main'}
                                        onPress={() => (isGate) ? onPress() : this.setState({visibleGateScanner: true})} />
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
        borderRadius: 5,
        padding: 10,
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainWhite,
        borderColor: Colors.lightGrey,
        borderWidth: 0.5
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardTicketB)