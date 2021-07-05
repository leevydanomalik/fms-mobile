import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Svg, { Line } from 'react-native-svg'
import { Styles, Colors } from '../../Themes'
import QRCode from 'react-native-qrcode-svg'
import CardTimer from './CardTimer'
import { ProgressiveImage } from '.'
import { Button } from 'native-base'
import Config from 'react-native-config'
import RNFetchBlob from 'rn-fetch-blob'
import R from 'ramda'
import Api from '../../Services/Api'
import M from 'moment'
import { connect } from 'react-redux'

const blue = "#0e74ff"
const green = "#2B9133"

class CardPir extends React.Component {
    constructor(props) {
        super(props)
        // const { params } = props.navigation.state
        this.state = {
            data: null,
            user: props.auth.user.data,
            permission: false
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        console.log("raww", this.props.rawData, this.props.rawData.split("https://cors-anywhere.herokuapp.com/"))
        let url = this.props.rawData.split("https://cors-anywhere.herokuapp.com/")
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        }
        let headersCoonex = {
            'Content-Type': 'application/json',
            'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
        }
        let uri = url.length > 1 ? url[1] : url[0]
        let cek = uri.split("connexpro")
        let source = { uri, headers: cek.length > 1 ? headersCoonex : headers }
        this.setState({ source })
        this.getData(source)
    }

    getData = async (source) => {
        let permission = false
        let res = await RNFetchBlob.fetch('GET', source.uri, source.headers)
        let response = JSON.parse(res.data)
        if (response.status == "S") {
            console.log("datas", response.data)
            let index = R.findIndex(R.propEq("signerID", this.state.user.userID))(response.data.sign)
            console.log("idx", index)
            if (index >= 0) permission = true
            this.setState({ data: response.data, permission })
        }
    }

    handleSign = async () => {
        let { data, source, user } = this.state
        let payload = {
            "signDate": M().format("DD-MM-YYYY"),
            "esID": "",
            "userID": user.userID,
            "signerID": user.userID,
            "docType": "",
            "docID": data.objectID
        }
        let res = await Api.create().postSign(payload)
        console.log("post sign", res)
        if (res.data && res.data.status === "S") this.getData(source)
    }

    handleVerify = async () => {
        let { data, user } = this.state
        let payload = {
            "verifyDate": M().format("DD-MM-YYYY"),
            "esID": "",
            "userID": user.userID,
            "signerID": user.userID,
            "docType": "",
            "docID": data.objectID
        }
        let res = await Api.create().verifySign(payload)
        console.log("verify sign", res)
        if (res.data && res.data.status === "S") Alert.alert("Information", res.data.data.toString())
    }

    render() {
        const { role, mainDesc } = this.props
        const { data, permission } = this.state
        const delivery = [
            {
                title: data && data.dsp && data.dsp.cesPlantID,
                to: "Ship To",
                desc: "Jl. Ci Ditiro No 12 Palembang 5011 Sumatera Selatan"
            },
            {
                title: data && data.es && data.es.cesPlantID,
                to: "Bill To",
                desc: "Jl. Medan Merdeka Timur 1A 10110 Jakarta "
            }
        ]

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
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{"Purchase Info Record Manager"}</Text>
                                <Text style={{ fontSize: 10 }}>Material Movement #303</Text>
                                <Text style={{ fontSize: 10 }}>Warehouse - 0001 Plumpang</Text>
                            </View>
                        </View>
                    </View>
                )}

                {(
                    <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Document</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Purchase Info Record ID#{data ? data.objectID : ""}</Text>
                            <Text style={{ fontSize: 12, marginTop: 5, color: "#999" }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                        </View>

                        <View style={{ marginTop: 20, flexDirection: "row" }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderWidth: 1, borderColor: "#999", borderRadius: 50 }}>
                                <FaIcon color="#ccc" size={25} name="home" />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ alignSelf: 'center', position: 'absolute', top: 0, color: "#000", fontWeight: "bold", fontSize: 11 }}>80 Box Mesran 80 UPC001 / 8 Pallet</Text>
                                <Text style={{ alignSelf: 'center', position: 'absolute', bottom: 0, fontSize: 8 }}>Single Step (45m20s)</Text>
                                <FaIcon size={20} color="#999" name="caret-right" style={{ position: "absolute", alignSelf: 'center' }} />
                                <View style={{ width: '100%', height: 1, backgroundColor: "#999" }} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderWidth: 1, borderColor: "#999", borderRadius: 50 }}>
                                <FaIcon size={25} name="home" color="#ccc" />
                            </View>
                        </View>

                        <View style={{ marginTop: 10, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }}>L301 - Pelumpang</Text>
                                <Text style={{ fontSize: 10 }}>23 March 2010 19:00 PM</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }}>L101 - Kertapati</Text>
                                <Text style={{ fontSize: 10 }}>23 March 2010 19:00 PM</Text>
                            </View>
                        </View>
                    </View>
                )}

                {(
                    <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
                        <Text style={{ padding: 15, color: "#BDBDBD", fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Details</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 15, paddingTop: 0, paddingRight: 20, paddingBottom: 5 }}>
                            {delivery.map((data, index) => {
                                return (
                                    <View key={index} style={{ elevation: 3, borderWidth: 1, borderColor: "#CCC", backgroundColor: green, padding: 15, borderRadius: 10, width: 300, height: 150, marginRight: index + 1 == delivery.length ? 0 : 15 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold", marginTop: 5, color: "#fff", marginBottom: 10 }}>{data.to}</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ flex: 0.5, marginBottom: 30 }}>
                                                    <Image resizeMode="cover" style={{ width: "90%", height: "90%" }} source={{ uri: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=60" }} />
                                                </View>
                                                <View style={{ flex: 0.5 }}>
                                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14, marginTop: -5 }}>{data.title}</Text>
                                                    <Text style={{ fontSize: 13, marginTop: 5, color: "#fff" }}>{data.desc}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <View style={{ padding: 15 }}>
                            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>Terms</Text>
                            <Text style={{ flex: 1, fontSize: 12, padding: 5 }}>{mainDesc}</Text>
                        </View>
                        <View style={{ borderTopWidth: 1, borderColor: "#ccc" }}></View>
                        <View style={{ padding: 15 }}>
                            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>Delivery</Text>
                            <Text style={{ fontSize: 12, color: "#000", marginTop: 10, marginBottom: 15 }}>Contract Delivery Date (PDT) : <Text style={{ fontWeight: "bold", color: "#000" }}>23 December 2020 </Text></Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ width: 30, height: 30, borderColor: "#CCC", borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                        <MatIcon name="garage" style={{ color: "#BDBDBD", fontSize: 30, textAlign: "center", marginBottom: 5 }} />
                                    </View>
                                </View>
                                <View style={{ flex: 0.9 }}>
                                    <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: "#000" }}>DSP L301 - Plumpang</Text>
                                    <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: "#BDBDBD" }}>Warehouse L301 SLOC 304</Text>
                                </View>
                            </View>
                            <Svg height={50} width={1} style={{ marginLeft: 15 }}>
                                <Line
                                    stroke="black"
                                    strokeDasharray="5, 5"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2={"100%"}
                                />
                            </Svg>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ width: 30, height: 30, borderColor: "#CCC", borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                        <MatIcon name="garage" style={{ color: "#BDBDBD", fontSize: 30, textAlign: "center", marginBottom: 5 }} />
                                    </View>
                                </View>
                                <View style={{ flex: 0.9 }}>
                                    <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: "#000" }}>DSP L201 - Kertapati</Text>
                                    <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: "#BDBDBD" }}>Warehouse L201 SLOC 204</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderTopWidth: 1, borderColor: "#ccc" }}></View>
                        <View style={{ padding: 15 }}>
                            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5, marginBottom: 10 }}>Materials</Text>
                            {data && data.materials.map(items => {
                                const { material } = items.material
                                return (
                                    <View style={{ flexDirection: 'row', marginBottom: 10, flex: 1 }}>
                                        <View style={{ flex: 0.8 }}>
                                            <Text style={{ flex: 1, fontSize: 13, paddingBottom: 10 }}>{`${material.materialName} (${material.materialKimap})`} </Text>
                                        </View>
                                        <View style={{ flex: 0.2 }} >
                                            <Text style={{ flex: 1, fontSize: 13, textAlign: "right", paddingBottom: 10 }}>{`${material.materialGrossWeigthUOM} ${material.materialUoM.value}`}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{ borderTopWidth: 1, borderColor: "#ccc" }}></View>
                        <View style={{ padding: 15 }}>
                            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>Notes</Text>
                            <Text style={{ flex: 1, fontSize: 12, padding: 5 }}>{data ? data.pirNote : "-"}</Text>
                        </View>
                    </View>
                )}
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Signature</Text>
                    </View>
                    {data && data.sign.map((item, index) => {
                        return (
                            <View key={index} style={{ flex: 1, flexDirection: "row", paddingBottom: 20 }}>
                                <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                                    <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                                </View>
                                <View style={{ flex: 0.6, marginLeft: 10, justifyContent: 'center', }}>
                                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{item.signerID}</Text>
                                    <Text style={{ fontSize: 10, color: "#000" }}>Public Key</Text>
                                    <Text style={{ fontSize: 10 }}>{item.signCert.publicKey ? item.signCert.publicKey : "-"}</Text>
                                    <Text style={{ fontSize: 10, color: "#000" }}>Certificate</Text>
                                    <Text style={{ fontSize: 10 }}>{item.signCert.info ? item.signCert.info : "-"}</Text>
                                    <Text style={{ fontSize: 10, color: "#000" }}>Signature</Text>
                                    <Text style={{ fontSize: 10 }}>{item.signHash ? item.signHash : "-"}</Text>
                                </View>
                                <View style={{ flex: 0.2, marginRight: 10 }}>
                                    <Text style={{ textAlign: "center", color: "#000", padding: 5, fontSize: 10 }}>{!R.isEmpty(item.signHash) ? "SIGNED" : "UN-SIGN"}</Text>
                                </View>
                                {!R.isEmpty(item.signHash) ?
                                    <TouchableOpacity style={{ flex: 0.2, float: "right" }} onPress={() => this.handleVerify()}>
                                        <View>
                                            <Text style={{ textAlign: "center", backgroundColor: green, borderRadius: 25, color: "#fff", padding: 5, fontSize: 10 }}>{"VERIFY"}</Text>
                                        </View>
                                    </TouchableOpacity> : null}
                            </View>
                        )
                    })}
                    <View>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>Notes</Text>
                        <Text style={{ flex: 1, fontSize: 12, padding: 5 }}>{data ? data.pirNote : "-"}</Text>
                    </View>
                    {permission &&
                        <TouchableOpacity onPress={() => this.handleSign()} style={{ borderColor: "red", borderWidth: 1, borderRadius: 20, padding: 10, marginLeft: -15, marginRight: -15, marginTop: 10, marginBottom: 50 }}>
                            <Text style={{ color: '#000', textAlign: "center", fontWeight: "bold" }}>
                                SIGN THIS DOCUMENT
                        </Text>
                        </TouchableOpacity>}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardPir)