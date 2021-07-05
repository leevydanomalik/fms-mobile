import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import {Styles, Colors} from '../../../Themes'
import QRCode from 'react-native-qrcode-svg'
import CardTimer from '../CardTimer'
import {connect} from "react-redux";

const blue = "#0e74ff"

class CardTaskLabeling extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            materials: []
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        this.setData()
    }

    setData = () => {
        const {data} = this.props
        let materials = []
        let datas = data.item.payload ? JSON.parse(data.item.payload) : null
        let miPalletQuantLabels = datas && datas.miPalletQuantLabels ? datas.miPalletQuantLabels : []
        miPalletQuantLabels && miPalletQuantLabels.map((value) => {
            return materials.push({
                ...value,
                fromBQs: value.pqBinQuantLoc,
                quantityPick: value.pqMaterial.material.materialGrossWeigth
            })
        })
        this.setState({materials})
    }

    render() {
        const {role, onVerifiedPress, data} = this.props
        const {materials} = this.state
        let shipto = {name: "", desc: ""}
        let billto = {name: "", desc: ""}
        let datas = data.item.payload ? JSON.parse(data.item.payload) : null
        let timers = {
            start: datas && datas.start ? datas.start : "",
            stop: datas && datas.stop ? datas.stop : "",
            duration: datas && datas.duration ? datas.duration : 0
        }
        let odID = datas && datas.miPutaway && datas.miPutaway.ptGoodReceipt && datas.miPutaway.ptGoodReceipt.grInboundDelivery ? datas.miPutaway.ptGoodReceipt.grInboundDelivery.objectID : ""
        let poNumber = datas && datas.miPutaway && datas.miPutaway.ptGoodReceipt && datas.miPutaway.ptGoodReceipt.grInboundDelivery && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder && datas.miPutaway.ptGoodReceipt.grInboundDelivery.idPurchaseOrder.objectID
        let docDate = datas ? datas.miDocDate : ""
        let pickers = this.props.auth.user ? this.props.auth.user.data.userName.toUpperCase() : ""
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
            <View>
                {(
                    <View style={{marginTop: 0, backgroundColor: "#fff", padding: 20}}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10
                        }}>
                            <Text style={{fontSize: 16, fontWeight: "bold", color: "#999"}}>Order By</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <FaIcon name="clock-o" color="#ccc" size={13}/>
                                <Text style={{fontSize: 10, color: "#ccc", marginLeft: 5}}>Dummy 1s Ago</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{height: 50, width: 50, borderRadius: 100}}>
                                <Image
                                    source={{uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"}}
                                    resizeMode="cover" style={{width: "100%", height: "100%", borderRadius: 100}}/>
                            </View>
                            <View style={{flex: 1, marginLeft: 10, justifyContent: 'center',}}>
                                <Text style={{color: "#000", fontSize: 16, fontWeight: "bold"}}>{shipto.name}</Text>
                                <Text style={{fontSize: 10}}>Labeling #{data.item.sourceID}</Text>
                                <Text style={{fontSize: 10}}>{shipto.desc}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {(
                    <View style={{marginTop: 10, backgroundColor: "#fff", padding: 20}}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 15
                        }}>
                            <Text style={{fontSize: 16, fontWeight: "bold", color: "#999"}}>Document</Text>
                        </View>

                        <View style={{flex: 1}}>
                            <Text
                                style={{color: "#000", fontSize: 16, fontWeight: "bold"}}>{`Labeling ID#${odID}`}</Text>
                            <Text style={{fontSize: 12, marginTop: 5, color: "#999"}}>{description}</Text>
                        </View>

                        <View style={{marginTop: 20, flexDirection: "row"}}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 50,
                                borderWidth: 1,
                                borderColor: "#999",
                                borderRadius: 50
                            }}>
                                <FaIcon color="#ccc" size={25} name="home"/>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{
                                    alignSelf: 'center',
                                    position: 'absolute',
                                    top: 0,
                                    color: "#000",
                                    fontWeight: "bold",
                                    fontSize: 10
                                }}>Dummy 80 Box Mesran 80 UPC001 / 8 Pallet</Text>
                                <Text style={{alignSelf: 'center', position: 'absolute', bottom: 0, fontSize: 8}}>Dummy
                                    Single Step (45m20s)</Text>
                                <FaIcon size={20} color="#999" name="caret-right"
                                        style={{position: "absolute", alignSelf: 'center'}}/>
                                <View style={{width: '100%', height: 1, backgroundColor: "#999"}}/>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 50,
                                height: 50,
                                borderWidth: 1,
                                borderColor: "#999",
                                borderRadius: 50
                            }}>
                                <FaIcon size={25} name="home" color="#ccc"/>
                            </View>
                        </View>

                        <View style={{marginTop: 10, flexDirection: "row"}}>
                            <View style={{flex: 1}}>
                                <Text style={{color: "#000", fontWeight: "bold", fontSize: 12}}>{shipto.name}</Text>
                                <Text style={{fontSize: 10}}>{shipto.desc}</Text>
                            </View>
                            <View style={{flex: 1, alignItems: "flex-end"}}>
                                <Text style={{color: "#000", fontWeight: "bold", fontSize: 12}}>{billto.name}</Text>
                                <Text style={{fontSize: 10}}>{billto.desc}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {(
                    <CardTimer timers={timers}/>
                )}

                {(
                    <View style={{marginTop: 10, backgroundColor: "#fff", padding: 20}}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10
                        }}>
                            <Text style={{fontSize: 16, fontWeight: "bold", color: "#999"}}>Labeling List</Text>
                        </View>

                        {materials.map((item, index) => {
                            const {pqMaterial, pqHUID, quantityPick, fromBQs} = item
                            return (
                                <View key={index}
                                      style={{borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 15}}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 15
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "#000"
                                        }}>LL#{index + 1}</Text>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "#000"
                                        }}>HU#{pqHUID}</Text>
                                    </View>

                                    <View style={{
                                        padding: 15,
                                        backgroundColor: Colors.main,
                                        flexDirection: "row",
                                        marginBottom: 15,
                                        borderRadius: 5
                                    }}>
                                        <View style={{height: 80, width: 80, borderRadius: 0, backgroundColor: "#fff"}}>
                                            <Image
                                                source={{uri: "https://s.blanja.com/picspace/16/132112/800.800_47b705a86fa14b2bb2a34c908015e4e0.jpg_800x800.jpg"}}
                                                resizeMode="cover"
                                                style={{width: "100%", height: "100%", borderRadius: 0}}/>
                                        </View>
                                        <View style={{flex: 1, marginLeft: 10, alignContent: "space-between"}}>
                                            <View style={{flex: 1}}>
                                                <Text style={{
                                                    color: "#fff",
                                                    fontSize: 12,
                                                    fontWeight: "bold"
                                                }}>{pqMaterial.material.materialKimap}</Text>
                                                <Text style={{
                                                    color: "#fff",
                                                    fontSize: 10
                                                }}>{pqMaterial.material.materialName}</Text>
                                                {/* <Text style={{ color: "#fff", fontSize: 10 }}>API SL AFR, 4X5L</Text> */}
                                            </View>
                                            <Text style={{
                                                color: "#fff",
                                                fontSize: 16,
                                                fontWeight: "bold"
                                            }}>{quantityPick} {pqMaterial.material.materialUoM && pqMaterial.material.materialUoM.value}</Text>
                                        </View>
                                        <TouchableOpacity onPress={onVerifiedPress}>
                                            <View style={{
                                                borderWidth: 3,
                                                borderColor: Colors.error,
                                                width: 80,
                                                height: 80,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <QRCode size={70} value={pqMaterial.material.materialKimap}/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <TouchableOpacity onPress={onVerifiedPress}
                                                          style={{alignItems: "center", alignContent: "center"}}>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 12,
                                                marginBottom: 5
                                            }}>{pqMaterial.material.materialKimap}</Text>
                                            <View style={{
                                                borderWidth: 3,
                                                borderColor: Colors.main,
                                                width: 100,
                                                height: 100,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <QRCode size={90} value={pqMaterial.material.materialKimap}/>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onVerifiedPress}
                                                          style={{alignItems: "center", alignContent: "center"}}>
                                            <Text
                                                style={{color: "#000", fontSize: 12, marginBottom: 5}}>{pqHUID}</Text>
                                            <View style={{
                                                borderWidth: 3,
                                                borderColor: Colors.error,
                                                width: 100,
                                                height: 100,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <QRCode size={90} value={pqHUID}/>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onVerifiedPress}
                                                          style={{alignItems: "center", alignContent: "center"}}>
                                            <Text
                                                style={{color: "#000", fontSize: 12, marginBottom: 5}}>{fromBQs}</Text>
                                            <View style={{
                                                borderRadius: 1,
                                                borderStyle: "dashed",
                                                borderWidth: 3,
                                                borderColor: "#ccc",
                                                width: 100,
                                                height: 100,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <QRCode size={90} value={fromBQs}/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}


                        {/* <View style={{ paddingTop: 15 }}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>LL#9686968886</Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>#2/HU0002</Text>
                            </View>

                            <View style={{ padding: 15, backgroundColor: Colors.main, flexDirection: "row", marginBottom: 15, borderRadius: 5 }}>
                                <View style={{ height: 80, width: 80, borderRadius: 0, backgroundColor: "#fff" }} >
                                    <Image source={{ uri: "https://s.blanja.com/picspace/16/132112/800.800_47b705a86fa14b2bb2a34c908015e4e0.jpg_800x800.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 10, alignContent: "space-between" }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>A884747774</Text>
                                        <Text style={{ color: "#fff", fontSize: 10 }}>FASTRON TECHNO 15W-50</Text>
                                        <Text style={{ color: "#fff", fontSize: 10 }}>API SL AFR, 4X5L</Text>
                                    </View>
                                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>20 BOX</Text>
                                </View>
                                <TouchableOpacity onPress={onVerifiedPress}>
                                    <View style={{ borderWidth: 3, borderColor: Colors.error, width: 80, height: 80, alignItems: "center", justifyContent: "center" }}>
                                        <QRCode size={70} value={"B29228PPK"} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={onVerifiedPress} style={{ alignItems: "center", alignContent: "center" }}>
                                    <Text style={{ color: "#000", fontSize: 12, marginBottom: 5 }}>P0-01-01</Text>
                                    <View style={{ borderWidth: 3, borderColor: Colors.main, width: 100, height: 100, alignItems: "center", justifyContent: "center" }}>
                                        <QRCode size={90} value={"P0-01-01"} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onVerifiedPress} style={{ alignItems: "center", alignContent: "center" }}>
                                    <Text style={{ color: "#000", fontSize: 12, marginBottom: 5 }}>HU-00001</Text>
                                    <View style={{ borderWidth: 3, borderColor: Colors.error, width: 100, height: 100, alignItems: "center", justifyContent: "center" }}>
                                        <QRCode size={90} value={"HU-00001"} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onVerifiedPress} style={{ alignItems: "center", alignContent: "center" }}>
                                    <Text style={{ color: "#000", fontSize: 12, marginBottom: 5 }}>Z9000</Text>
                                    <View style={{ borderRadius: 1, borderStyle: "dashed", borderWidth: 3, borderColor: "#ccc", width: 100, height: 100, alignItems: "center", justifyContent: "center" }}>
                                        <QRCode size={90} value={"Z9000"} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardTaskLabeling)