import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import Config from 'react-native-config'
import RNFetchBlob from 'rn-fetch-blob'
import R from 'ramda'
import Api from '../../../Services/Api'
import M from 'moment'
import { connect } from 'react-redux'
import { CardOrder, CardDocument, CardDelivery, CardMaterial, CardContract, CardNote, CardSignature, CardSigner } from '../../Components'

const blue = "#0e74ff"
const green = "#2B9133"

class ComponentSpace extends React.Component {
    render() {
        return (
            <View style={{ width: "100%", height: 10 }}></View>
        )
    }
}

class CardReplenishmentPick extends React.Component {
    constructor(props) {
        super(props)
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
        let uri = url.length > 1 ? url[1] : url[0]
        let source = { uri, headers: headers }
        this.setState({ source })
        this.getData(source)
    }

    getData = async (source) => {
        let permission = false
        let res = await RNFetchBlob.fetch('GET', source.uri, source.headers)
        let response = JSON.parse(res.data)
        if (response.status == "S") {
            console.log("datas", response.data)
            let userSign = response.data.signs.map(item => {
                return { signerID: item.signerID.userID }
            })
            let index = R.findIndex(R.propEq("signerID", this.state.user.userID))(userSign)
            console.log("idx", index)
            if (index >= 0) permission = true
            this.setState({ data: response.data, permission, userSignature: response.data.signs[index] })
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
        let res = await Api.create().postSignatureReplenishmentPicking(payload)
        console.log("post sign", res)
        if (res.data && res.data.status === "S") return this.getData(source)
    }

    handleVerify = async (userID) => {
        let { data } = this.state
        let payload = {
            "verifyDate": M().format("DD-MM-YYYY"),
            "esID": "",
            "userID": userID,
            "signerID": userID,
            "docType": "",
            "docID": data.objectID
        }
        let res = await Api.create().verifySignatureReplenishmentPicking(payload)
        console.log("verify sign", res)
        if (res.data && res.data.status === "S") return Alert.alert("Information", res.data.data.toString())
    }

    borderTop = () => (
        <View style={{ borderTopWidth: 0.5, borderColor: "#ccc" }}></View>
    )

    render() {
        const { mainDesc } = this.props
        const { data, permission, userSignature } = this.state
        let from = data && data.pcReplensihmentOrder && data.pcReplensihmentOrder.mrFrom && data.pcReplensihmentOrder.mrFrom.cesStorageBinQuantID && data.pcReplensihmentOrder.mrFrom.cesStorageBinQuantID.binQuantLocCode
        let fromDesc = data && data.pcReplensihmentOrder && data.pcReplensihmentOrder.mrFrom && data.pcReplensihmentOrder.mrFrom.cesStorageBinQuantID && data.pcReplensihmentOrder.mrFrom.cesStorageBinQuantID.binQuantName
        let to = data && data.pcReplensihmentOrder && data.pcReplensihmentOrder.mrTo && data.pcReplensihmentOrder.mrTo.cesStorageBinQuantID && data.pcReplensihmentOrder.mrTo.cesStorageBinQuantID.binQuantLocCode
        let toDesc = data && data.pcReplensihmentOrder && data.pcReplensihmentOrder.mrTo && data.pcReplensihmentOrder.mrTo.cesStorageBinQuantID && data.pcReplensihmentOrder.mrTo.cesStorageBinQuantID.binQuantName
        const delivery = [
            {
                title: data && data.es && data.es.plant && data.es.plant.plantName,
                to: "From",
                desc: data && data.es && data.es.plant && data.es.plant.plantAddress && `${data.es.plant.plantAddress.streetName} ${data.es.plant.plantAddress.kelurahanID.subZipcode} ${data.es.plant.plantAddress.provinceID.data.dtName} ${data.es.plant.plantAddress.countryID.data.dtName}`
            },
            {
                title: data && data.es && data.es.plant && data.es.plant.plantName,
                to: "To",
                desc: data && data.es && data.es.plant && data.es.plant.plantAddress && `${data.es.plant.plantAddress.streetName} ${data.es.plant.plantAddress.kelurahanID.subZipcode} ${data.es.plant.plantAddress.provinceID.data.dtName} ${data.es.plant.plantAddress.countryID.data.dtName}`
            }
            // {
            //     title: data && data.pcReplensihmentOrder && data.pcReplensihmentOrder.mrFrom && data.pcReplensihmentOrder.mrFrom.cesStorageBinQuantID && data.pcReplensihmentOrder.mrFrom.cesStorageBinQuantID.binQuantLocCode,
            //     to: "From",
            //     desc: data && data.pcReplensihmentOrder && data.pcReplensihmentOrder.mrFrom && data.pcReplensihmentOrder.mrFrom.cesStorageBinQuantID && data.pcReplensihmentOrder.mrFrom.cesStorageBinQuantID.binQuantName,
            // },
            // {
            //     title: data && data.pcReplensihmentOrder && data.pcReplensihmentOrder.mrTo && data.pcReplensihmentOrder.mrTo.cesStorageBinQuantID && data.pcReplensihmentOrder.mrTo.cesStorageBinQuantID.binQuantLocCode,
            //     to: "To",
            //     desc: data && data.pcReplensihmentOrder && data.pcReplensihmentOrder.mrTo && data.pcReplensihmentOrder.mrTo.cesStorageBinQuantID && data.pcReplensihmentOrder.mrTo.cesStorageBinQuantID.binQuantName,
            // }
        ]
        const materialData = []
        data ? data.pcMaterials && data.pcMaterials.map((value) => {
            const { pcMaterialHU } = value
            pcMaterialHU && pcMaterialHU.map((val) => {
                val.fromBQs && val.fromBQs.map((values) => {
                    return materialData.push({ material: val.mpMaterial, qtyUoM: values.pickQty })
                })
                return null
            })
            return null
        }) : []

        return (
            <View>
                <CardOrder
                    date={data ? M(data.pcPlanDate, "DD-MM-YYYY").format("DD MMMM YYYY") : "-"}
                    photo={"https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"}
                    role={"Replenishment Picking Manager"}
                    movement={"Material Movement #303"}
                    warehouse={data && data.es.plant && data.es.plant.plantName} />

                <ComponentSpace />
                <CardDocument
                    type={"Replenishment Picking ID"}
                    docID={data ? data.objectID : ""}
                    desc={data ? data.pcDesc : "-"}
                    pointer={{ title: "80 Box Mesran 80 UPC001 / 8 Pallet", step: "Single Step (45m20s)" }}
                    fromTo={{ title: from, date: data && M(data.pcPlanDate, "DD-MM-YYYY").format("DD MMMM YYYY") }}
                    shipTo={{ title: to, date: data && M(data.pcPlanDate, "DD-MM-YYYY").format("DD MMMM YYYY") }}
                />

                <ComponentSpace />
                <CardDelivery title="Details" desc={mainDesc} data={delivery} />

                {this.borderTop()}
                <View style={{ backgroundColor: "#fff", padding: 15, paddingBottom: 20 }}>
                    <CardContract
                        data={[
                            { title: from, subtitle: fromDesc },
                            { title: to, subtitle: toDesc }
                        ]}
                        service={'PDT'}
                        date={data ? M(data.pcPlanDate, "DD-MM-YYYY").format("DD MMMM YYYY") : "-"} />
                </View>

                <ComponentSpace />
                <CardMaterial title="Materials" data={data && materialData} />
                {this.borderTop()}
                <CardNote title="Notes" desc={data ? data.pcNote : "-"} />

                <ComponentSpace />
                <CardSignature data={data && data.signs} onClickVerify={(userID) => this.handleVerify(userID)} />

                {permission && R.isEmpty(userSignature.signHash) && (
                    <CardSigner onClick={() => this.handleSign()} />
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

export default connect(mapStateToProps, null)(CardReplenishmentPick)