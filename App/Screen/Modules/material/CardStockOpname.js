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

class CardStockOpname extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            user: props.auth.user.data,
            permission: false,
            materialData: [],
            limit: 15, 
            offset: 0,
            visibleMaterialLoader: false,
            countMaterial: 0
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
        const {limit, offset} = this.state
        let permission = false
        let res = await RNFetchBlob.fetch('GET', source.uri, source.headers)
        let response = JSON.parse(res.data)
        if (response.status == "S") {
            this.getCountMaterial(response.data.objectID)
            this.getDataMaterial(response.data.objectID, limit, offset)

            let userSign = response.data.signs.map(item => {
                return { signerID: item.signerID.userID }
            })
            let index = R.findIndex(R.propEq("signerID", this.state.user.userID))(userSign)

            if (index >= 0) permission = true
            this.setState({ data: response.data, permission, userSignature: response.data.signs[index] })
        }
    }

    getCountMaterial = async (soID) => {
        let res = await Api.create().getMaterialCountSOItem(soID)
        this.setState({ countMaterial: res && res.data && res.data.data ? res.data.data : 0 })
    }

    getDataMaterial = async (soID, limit = 0, offset = 0) => {
        this.setState({ visibleMaterialLoader: true })

        let materialData = []
        const payload = { limit: limit, offset: offset, params: { kimap: "", soID } }
        const res = await Api.create().getMaterialSOItem(payload)

        if (res.data && res.data.data) {
            res.data.data && res.data.data.map((value) => {
                materialData.push({ material: value.msoMaterial })
                return null
            })
            this.setState({ materialData, visibleMaterialLoader: false, limit, offset })
        } else {
            this.setState({ visibleMaterialLoader: false })
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
        let res = await Api.create().postSignatureStockOpname(payload)
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
        let res = await Api.create().verifySignatureStockOpname(payload)
        console.log("verify sign", res)
        if (res.data && res.data.status === "S") return Alert.alert("Information", res.data.data.toString())
    }

    borderTop = () => (
        <View style={{ borderTopWidth: 0.5, borderColor: "#ccc" }}></View>
    )

    render() {
        // const { mainDesc } = this.props
        const { data, permission, userSignature, materialData, visibleMaterialLoader, countMaterial, limit, offset } = this.state
        // const delivery = [
        //     {
        //         title: "-",
        //         to: "Ship To",
        //         desc: "-"
        //     },
        //     {
        //         title: "-",
        //         to: "Bill To",
        //         desc: "-"
        //     }
        // ]

        return (
            <View>
                <CardOrder
                    date={data ? M(data.soDocDate, "DD-MM-YYYY").format("DD MMMM YYYY") : "-"}
                    photo={"https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"}
                    role={"Stock Opname Manager"}
                    movement={"Material Movement #303"}
                    warehouse={data && data.es.plant && data.es.plant.plantName} />

                {/* <ComponentSpace />
                <CardDocument
                    type={"Stock Opname ID"}
                    docID={data ? data.objectID : ""}
                    desc={data ? data.soNote : "-"}
                    pointer={{ title: "80 Box Mesran 80 UPC001 / 8 Pallet", step: "Single Step (45m20s)" }}
                    fromTo={{ title: "-", date: "-" }}
                    shipTo={{ title: "-", date: "-" }}
                /> */}

                {/* <ComponentSpace />
                <CardDelivery title="Details" desc={mainDesc} data={delivery} /> */}

                {/* {this.borderTop()}
                <View style={{ backgroundColor: "#fff", padding: 15, paddingBottom: 20 }}>
                    <CardContract
                        data={[
                            { title: "-", subtitle: "-" },
                            { title: "-", subtitle: "-" }
                        ]}
                        service={'PDT'}
                        date={data ? M(data.soPlanDate, "DD-MM-YYYY").format("DD MMMM YYYY") : "-"} />
                </View> */}

                <ComponentSpace />
                <CardMaterial 
                    title="Materials" 
                    data={data && materialData}
                    enablePaging={countMaterial > limit ? true : false}
                    limit={limit}
                    offset={offset}
                    loader={visibleMaterialLoader}
                    countMaterial={countMaterial}
                    onLoadMore={(page) => this.getDataMaterial(data.objectID, limit, (page - 1))}
                    onPrevMore={() => this.getDataMaterial(data.objectID, limit, (offset - 1))}
                    onNextMore={() => this.getDataMaterial(data.objectID, limit, (offset + 1))} />
                {this.borderTop()}
                <CardNote title="Notes" desc={data ? data.soNote : "-"} />

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

export default connect(mapStateToProps, null)(CardStockOpname)