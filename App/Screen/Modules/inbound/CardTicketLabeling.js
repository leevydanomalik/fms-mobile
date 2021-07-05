import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../../../Themes'
import {connect} from "react-redux"
import CardWarehouseRoute from '../../Components/CardWarehouseRoute'
import ButtonNext from '../../Components/ButtonNext'
import CardValidationGate from '../../Components/CardValidationGate'

class CardTicketLabeling extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            visibleGateScanner: false
        }
    }

    static defaultProps = {
        onPress: () => null
    }

    render() {
        const { visibleGateScanner } = this.state
        const { onPress, onScanner, id, collapse, data, objectID } = this.props
        let shipto = { name: "", desc: ""}
        let billto = { name: "", desc: ""}
        let datas = data.item.payload ? JSON.parse(data.item.payload) : null
        let poNumber = datas && datas.miPutaway && datas.miPutaway.ptGoodReceipt && datas.miPutaway.ptGoodReceipt.grInboundDelivery && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.objectID
        let docDate = datas ? datas.miDocDate : ""
        let pickers = this.props.auth.user.data.userName
        let description = datas ? datas.miDesc : ""
        if (poNumber) {
            shipto = {
                name: datas && datas.miPutaway && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poShipTo && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poShipTo.cesPlantID && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poShipTo.cesPlantID.plantName,
                desc: datas && datas.miPutaway && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poShipTo && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poShipTo.cesPlantID && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poShipTo.cesPlantID.plantDesc
            }
            billto = {
                name: datas && datas.miPutaway && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poBillTo && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poBillTo.cesPlantID && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poBillTo.cesPlantID.plantName,
                desc: datas && datas.miPutaway && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poBillTo && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poBillTo.cesPlantID && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.poBillTo.cesPlantID.plantDesc
            }
        }
        return (
            <View style={{ paddingTop: id == 0 ? 5 : 15, padding: 15, paddingBottom: visibleGateScanner ? 20 : 0 }}>
                {visibleGateScanner 
                ? (
                    <CardValidationGate 
                        title={'Start Material Movement Order'}
                        subtitle={'Steps to follow'}
                        description={'To accomplish the process of material inbound by transporter must follow theses following instruction sequentially'}
                        multistep={[0, 1, 2, 3, 4, 5]}
                        multiDescription={'Driver License Checking, Fleet Commossioning Certificate Checking, Document Checking, Seal Number Checking. We also record time elapsed through out the process'}
                        buttonTitle={'START MOVEMENT ORDER'}
                        onPress={() => {
                            onScanner()
                            this.setState({visibleGateScanner: false})
                        }}
                        onBack={() => this.setState({visibleGateScanner: false})}
                    /> 
                ) : (
                    <TouchableOpacity onPress={() => this.setState({visibleGateScanner: true})} style={{ ...styles.container, borderWidth: objectID === data.item.humanTaskID ? 3 : 0, borderColor: objectID === data.item.humanTaskID ? Colors.mainPlaceholder : "transparent" }}>
                        {!collapse ? (
                            <View style={{ flex: 1, alignContent: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center" }}>
                                    <View style={{ height: 45, width: 45, borderRadius: 100 }} >
                                        <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                                    </View>
                                    <View style={{ marginLeft: 10, alignContent: "center" }}>
                                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", marginRight: 5 }}>Dummy Manager</Text>
                                            <FaIcon name="clock-o" color="#ccc" size={13} />
                                            <Text style={{ fontSize: 10, color: "#ccc", marginLeft: 5 }}>Dummy 1s Ago</Text>
                                        </View>
                                        <Text style={{ fontSize: 10, color: "#999" }}>{docDate} - {pickers} - {data ? data.item.sourceID : ""}</Text>
                                    </View>
                                </View>
                                <View style={{ position: "absolute", top: 10, right: 0 }}>
                                    {/* <FaIcon name="angle-right" color="#ccc" size={30} /> */}
                                </View>
                                <View style={{ width: 60, padding: 3.5, backgroundColor: Colors.mainPlaceholder, alignItems: "center", borderRadius: 5, position: "absolute", right: -10, top: -15 }}>
                                    <Text style={{ color: "#000", fontSize: 10 }}>{data && data.item.taskStatus ? data.item.taskStatus : "WIP"}</Text>
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
                                            <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>Dummy Manager</Text>
                                            <Text style={{ fontSize: 10, color: "#999" }}>{docDate} - {pickers} - {data.item.sourceID}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row", position: "absolute", top: 0, right: 0 }}>
                                        <FaIcon name="clock-o" color="#ccc" size={13} />
                                        <Text style={{ fontSize: 10, color: "#ccc", marginLeft: 5 }}>Dummy 1s Ago</Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between" }}>
                                    <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>{`Labeling ${poNumber}`}</Text>
                                    <TouchableOpacity style={{ width: 60, padding: 3.5, backgroundColor: Colors.mainPlaceholder, alignItems: "center", borderRadius: 5, position: "absolute", right: 0, bottom: 5 }}>
                                        <Text style={{ color: "#000", fontSize: 10 }}>{data && data.item.taskStatus ? data.item.taskStatus : "WIP"}</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontSize: 12, marginTop: 5, color: "#999" }}>
                                    {description}
                                </Text>

                                <View style={{ marginTop: 20 }}>
                                    <CardWarehouseRoute 
                                        centerTitle={'Dummy 80 Box Mesran 80 UPC001 / 8 Pallet'}
                                        centerSubtitle={'Dummy Single Step (45m20s)'}
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
                                    <ButtonNext title={'Ticket#' + (data && data.item.humanTaskID ? data.item.humanTaskID : "86886868")} onPress={() => onPress()} />
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardTicketLabeling)