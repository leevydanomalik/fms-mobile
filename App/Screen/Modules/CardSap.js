import React from 'react'
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../Themes'
import Api from '../../Services/Api'
import M from 'moment'
import Spinkit from 'react-native-spinkit'
import * as R from 'ramda'
import NavbarMenu from '../Components/NavbarMenu'
import { postToSap } from '../../Lib/Utils'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import ProgressiveImage from './ProgressiveImage'
import { generateUrlPhoto } from '../../Utils'

class CardSap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.auth.user,
            collapseAll: false,
            fetching: false,
            dataSap: [],
            limit: 5,
            offset: 0,
            totalData: 0,
            notifDatas: [
                {
                    title: "Leave Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "WAITING FOR APPROVAL",
                    widthLabel: 120,
                    rightLabel: -120,
                    color: "orange",
                    collapse: false
                },
                {
                    title: "Business Trip Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "REJECTED",
                    widthLabel: 80,
                    rightLabel: -80,
                    color: "red",
                    collapse: false
                },
                {
                    title: "Training Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "APPROVED",
                    widthLabel: 80,
                    rightLabel: -80,
                    color: Colors.mainPlaceholder,
                    collapse: false
                }
            ]
        }
    }

    componentDidMount() {
        this.getDataTaskList(this.state.limit, this.state.offset)
    }

    getDataTaskList = async (limit, offset) => {
        this.setState({ fetching: true })
        console.log("sap", this.props.roleType, limit, offset)
        let dataSap = Object.assign([], this.state.dataSap)
        let rawData = Object.assign([], this.state.rawData)
        let payload = {
            limit: limit,
            offset: offset,
            params: {}
        }
        let count = await Api.create().getCountSapAll()
        if (count.data && count.data.status === "S") this.setState({ totalData: count.data.data })
        let res = await Api.create().getSapAll(payload)
        if (res.data && res.data.status === "S") {
            res.data.data.map(item => {
                const { sapPostingStatus, type, sourceID, sapCreationalDTO, sapPostingURL, sapPostingMethod, sapPostingPayload, sapResponse } = item
                dataSap.push({
                    title: type ? type.value : "NONE",
                    subtitle: `${M(sapCreationalDTO.createdDate, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY")} - ${sourceID} - ${sapPostingMethod.value}`,
                    status: sapPostingStatus ? sapPostingStatus.value : "NONE",
                    payload: sapPostingPayload ? sapPostingPayload : "",
                    response: sapResponse ? sapResponse : "",
                    url: sapPostingURL ? sapPostingURL : "",
                    type: type ? type.key : "",
                    success: sapResponse ? (sapResponse === "sapResponse" || sapResponse === "") ? false : true : false,
                    widthLabel: 80,
                    rightLabel: -80,
                    color: "orange",
                    collapse: false
                })
                return null
            })
            rawData.push(...res.data.data)
            this.setState({ dataSap, rawData, fetching: false, limit, offset })
        }
    }

    handleRepost = async (index, payload, url, type) => {
        let { dataSap } = this.state
        console.log("payloads", payload, url, type)
        let result = await postToSap(payload, url, type)
        if (result.stat === "S") {
            dataSap[index] = { ...dataSap[index], success: true, response: JSON.stringify(result.data, undefined, 4), sapReff: result.reffNo }
            console.log("Resss", dataSap)
            this.setState({ dataSap })
        }
    }

    handleCollapse = (index, type) => {
        let { dataSap, notifDatas } = this.state
        if (type === "first") dataSap[index] = { ...dataSap[index], collapse: !dataSap[index].collapse }
        else notifDatas[index] = { ...notifDatas[index], collapse: !notifDatas[index].collapse }
        this.setState({ dataSap, notifDatas })
    }

    handleCollapseAll = () => {
        let { collapseAll, notifDatas, dataSap } = this.state
        dataSap = dataSap.map(value => {
            return { ...value, collapse: !collapseAll }
        })
        notifDatas = notifDatas.map(val => {
            return { ...val, collapse: !collapseAll }
        })
        this.setState({ notifDatas, dataSap, collapseAll: !collapseAll })
    }

    render() {
        const { data } = this.state.user
        let { collapseAll, dataSap, notifDatas, rawData, fetching, totalData, limit, offset } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <NavbarMenu
                    title={'SAP Activity'}
                />
                <ScrollView>
                    <View style={{ backgroundColor: "#fff", marginBottom: 10 }}>
                        <View style={{
                            padding: 15,
                            paddingBottom: 5,
                            backgroundColor: "#fff",
                            flexDirection: "row",
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{ paddingRight: 20, flexDirection: "row", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: "#999",
                                    fontWeight: "bold"
                                }}>Today {M().format("DD MMMM YYYY")}</Text>
                            </View>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <TouchableOpacity onPress={() => this.handleCollapseAll()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                        <FaIcon name={!collapseAll ? "plus" : "minus"} size={12} color="#adadad" />
                                        <Text style={{ fontSize: 12, color: '#999', marginLeft: 10 }}>
                                            {collapseAll ? "Collapse All" : "Expand All"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {dataSap.map((val, index) => {
                            const { title, subtitle, color, widthLabel, rightLabel, status, success, collapse, payload, response, url, type } = val
                            return (
                                <View 
                                    key={index} 
                                    style={{ padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 0.8 }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{ width: 45, height: 45, marginRight: 15 }}>
                                            <ProgressiveImage
                                                resizeMode="cover" 
                                                sizeSpinner={28}
                                                style={{ borderRadius: 100, width: "100%", height: "100%", backgroundColor: Colors.white }}
                                                source={{
                                                    uri: generateUrlPhoto(data && data.userID),
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                                    }
                                                }} />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 5, paddingBottom: 5 }}>
                                            <Text
                                                style={{
                                                    color: "#000",
                                                    fontSize: 16,
                                                    fontWeight: "bold",
                                                    marginBottom: 5
                                                }}>
                                                {title}
                                            </Text>
                                            <Text style={{ fontSize: 10, color: "#999" }}>
                                                {subtitle}
                                            </Text>
                                        </View>
                                        {!success &&
                                        <TouchableOpacity
                                            onPress={() => this.handleRepost(index, payload, url, type)}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                marginLeft: 15,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <FaIcon name={"refresh"} size={22} color="#adadad" />
                                        </TouchableOpacity>}
                                        <TouchableOpacity
                                            onPress={() => this.handleCollapse(index, "first")}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                borderRadius: 100,
                                                backgroundColor: success ? "#2B9133" : color,
                                                marginLeft: 15,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <AntIcon name={collapse ? "minus" : "plus"} color="#fff" size={20} />
                                        </TouchableOpacity>
                                    </View>
                                    {collapse ? (
                                        <View style={{ marginTop: 10, paddingLeft: 60 }}>
                                            <Text style={{ fontSize: 12, color: '#999' }}>
                                                <Text style={{ fontWeight: "bold" }}>Payload: </Text>
                                                {payload}
                                            </Text>
                                            <Text style={{ fontSize: 12, color: '#999', marginTop: 10 }}>
                                                <Text style={{ fontWeight: "bold" }}>Response: </Text>
                                                {response}
                                            </Text>
                                        </View>
                                    ) : null}
                                </View>
                            )
                        })}
                    </View>

                    {fetching && (
                        <View style={{
                            marginTop: 20,
                            backgroundColor: "#fff",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Spinkit isVisible={true} size={50} type="Circle" color={Colors.main} />
                        </View>
                    )}
                    {dataSap.length > 0 && dataSap.length < totalData ?
                        <View style={{
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 30
                        }}>
                            <TouchableOpacity onPress={() => this.getDataTaskList(limit, offset + 1)} style={{
                                borderRadius: 100,
                                backgroundColor: "#eee",
                                justifyContent: "center",
                                padding: 10,
                                width: 80
                            }}>
                                <Text style={{
                                    color: "#000",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 14
                                }}>More</Text>
                            </TouchableOpacity>
                        </View> : <View style={{ paddingTop: 30, paddingBottom: 30 }}></View>}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(CardSap)