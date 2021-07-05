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

class CardLoadingOrder extends React.Component {
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
        let res = await Api.create().postSignatureLo(payload)
        console.log("post sign", res)
        if (res.data && res.data.status === "S") this.getData(source)
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
        let res = await Api.create().verifySignatureLo(payload)
        console.log("verify sign", res)
        if (res.data && res.data.status === "S") Alert.alert("Information", res.data.data.toString())
    }

    borderTop = () => (
        <View style={{ borderTopWidth: 0.5, borderColor: "#ccc" }}></View>
    )

    render() {
        const { mainDesc } = this.props
        const { data, permission, userSignature } = this.state
        const delivery = [
            {
                title: data && data.loOutboundDelivery && data.loOutboundDelivery.odPurchaseOrder && data.loOutboundDelivery.odPurchaseOrder.poShipTo.cesPlantID.plantName,
                to: "Ship To",
                desc: data && data.loOutboundDelivery && data.loOutboundDelivery.odPurchaseOrder && `${data.loOutboundDelivery.odPurchaseOrder.poShipTo.cesPlantID.plantAddress.streetName} ${data.loOutboundDelivery.odPurchaseOrder.poShipTo.cesPlantID.plantAddress.kelurahanID.subZipcode} ${data.loOutboundDelivery.odPurchaseOrder.poShipTo.cesPlantID.plantAddress.provinceID.data.dtName} ${data.loOutboundDelivery.odPurchaseOrder.poShipTo.cesPlantID.plantAddress.countryID.data.dtName}`
            },
            {
                title: data && data.loOutboundDelivery && data.loOutboundDelivery.odPurchaseOrder && data.loOutboundDelivery.odPurchaseOrder.poBillTo.cesPlantID.plantName,
                to: "Bill To",
                desc: data && data.loOutboundDelivery && data.loOutboundDelivery.odPurchaseOrder && `${data.loOutboundDelivery.odPurchaseOrder.poBillTo.cesPlantID.plantAddress.streetName} ${data.loOutboundDelivery.odPurchaseOrder.poBillTo.cesPlantID.plantAddress.kelurahanID.subZipcode} ${data.loOutboundDelivery.odPurchaseOrder.poBillTo.cesPlantID.plantAddress.provinceID.data.dtName} ${data.loOutboundDelivery.odPurchaseOrder.poShipTo.cesPlantID.plantAddress.countryID.data.dtName}`
            }
            // {
            //     title: data && data.loShipTo && data.loShipTo.cesPlantID.plantName,
            //     to: "Ship To",
            //     desc: data && data.loShipTo && `${data.loShipTo.cesPlantID.plantAddress.streetName} ${data.loShipTo.cesPlantID.plantAddress.kelurahanID.subZipcode} ${data.loShipTo.cesPlantID.plantAddress.provinceID.data.dtName} ${data.loShipTo.cesPlantID.plantAddress.countryID.data.dtName}`
            // },
            // {
            //     title: "-",
            //     to: "Bill To",
            //     desc: "-"
            // }
        ]
        const contract = [
            {
                title: data && data.loOutboundDelivery && data.loOutboundDelivery.odPurchaseOrder && data.loOutboundDelivery.odPurchaseOrder.poSupplierPlant.cesPlantID.plantName, 
                subtitle: `${data && data.loOutboundDelivery && data.loOutboundDelivery.odPurchaseOrder && data.loOutboundDelivery.odPurchaseOrder.poSupplierPlant.cesPlantID.plantDesc}` 
            },
            {
                title: data && data.loOutboundDelivery && data.loOutboundDelivery.odPurchaseOrder && data.loOutboundDelivery.odPurchaseOrder.poShipTo.cesPlantID.plantName, 
                subtitle: `${data && data.loOutboundDelivery && data.loOutboundDelivery.odPurchaseOrder && data.loOutboundDelivery.odPurchaseOrder.poShipTo.cesPlantID.plantDesc}` 
            }
            // {
            //     title: data && data.loShipTo && data.loShipTo.cesPlantID.plantName,
            //     subtitle: data && data.loShipTo && data.loShipTo.cesPlantID.plantDesc
            // },
            // {
            //     title: "-",
            //     subtitle: "-"
            // }
        ]
        const materialData = []
        data && data.loMaterial.map((items) => {
            materialData.push({
                qtyUoM: items.uomQtyLO,
                ...items
            })
            return null
        })

        let routeMaterialName = ''
        let countUOM = 0
        let typeUOM = ''
        let segment = ''
        let materialName = ''

        materialData && materialData.map((items, index) => {
            const { material } = items.material
            countUOM += items.qtyUoM
            typeUOM = material.materialUoM.value
            segment = material.mtTypeBox.materialSegmentBox.materialSegmentName
            materialName = material.materialName
            // console.log('material', material.mtTypeBox.materialSegmentBox.materialSegmentName)
            return null
        })

        routeMaterialName = `${countUOM} ${typeUOM} ${segment} / 0 Pallet`

        return (
            <View>
                <CardOrder
                    date={data && M(data.loDocDate, "DD-MM-YYYY").format("DD MMMM YYYY")}
                    photo={"https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"}
                    role={"Loading Order Manager"}
                    movement={"Material Movement #303"}
                    warehouse={data && data.es.plant && data.es.plant.plantName} />

                <ComponentSpace />
                <CardDocument
                    type={"Loading Order ID"}
                    docID={data ? data.objectID : ""}
                    desc={data && data.loDesc ? data.loDesc : "-"}
                    pointer={{ title: routeMaterialName, step: "Single Step (45m20s)" }}
                    fromTo={{ title: contract[0].title, date: data ? M(data.loPlanDate, "DD-MM-YYYY").format("DD MMMM YYYY") : "-" }}
                    shipTo={{ title: contract[1].title, date: data ? M(data.loPlanDate, "DD-MM-YYYY").format("DD MMMM YYYY") : "-" }}
                />

                <ComponentSpace />
                <CardDelivery title="Details" desc={mainDesc} data={delivery} />

                {this.borderTop()}
                <View style={{ backgroundColor: "#fff", padding: 15, paddingBottom: 20 }}>
                    <CardContract
                        data={data && contract}
                        service={'PDT'}
                        date={data ? M(data.loPlanDate, "DD-MM-YYYY").format("DD MMMM YYYY") : "-"} />
                </View>

                <ComponentSpace />
                <CardMaterial title="Materials" data={data && materialData} />
                {this.borderTop()}
                <CardNote title="Notes" desc={data ? data.loNote : "-"} />

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

export default connect(mapStateToProps, null)(CardLoadingOrder)